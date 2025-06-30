const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const prisma = new PrismaClient();
exports.createOrder = async (orderData, userId) => {
  const {
    shippingAddress,
    billingAddress,
    shippingMethod,
    totalAmount,
    items,
    notes,
    deliveryDate,
    couponCode,
    cartId,

  } = orderData;
  const parsedDate = new Date(deliveryDate);

  const order = await prisma.$transaction(async (tx) => {
    for (const it of items) {
      const { productId, attributeIds = [] } = it;
      const valid = await tx.productAttributeValue.findMany({
        where: {
          id: { in: attributeIds },
          productId: productId,
        },
        select: { id: true },
      });

      if (valid.length !== attributeIds.length) {
        throw new Error(
          `One or more attributeIds are invalid for product ${productId}`
        );
      }
      await tx.order.create({
        data: {
          user: {
            connect: {
              id: userId
            }
          },
          shippingAddress: {
            connect: {
              id: shippingAddress
            }
          },
          billingAddress: {
            connect: {
              id: billingAddress
            }
          },
          shippingMethod,
          totalAmount,
          deliveryDate: parsedDate,
          notes,
          items: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              attributes: {
                create: [...new Set(attributeIds ?? [])].map((id) => ({
                  productAttributeValueId: id,
                })),
              },
            }))
          }
        },
        include: {
        }
      });
    }

    await Promise.all(
      items.map(item =>
        tx.stock.update({
          where: { productId: item.productId },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        })
      )
    );
    const existingCoupon = await tx.coupon.findFirst({
      where: {
        code: couponCode
      }
    });
    if (existingCoupon) {
      await tx.coupon.update({
        where: { id: existingCoupon.id },
        data: {
          couponCount: {
            decrement: 1,
          },
        },
      });
    }

    if (cartId) {
      const existingCart = await tx.cart.findFirst({
        where: {
          id: cartId
        }
      });
      if (existingCart) {
        await tx.cart.delete({
          where: { id: cartId },
        });
      }

    }
  });
  return order;
};


exports.getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      items: {

        include: {
          attributes: {
            include: {
              productAttributeValue: {
                include: { attributeDefinition: true },
              },
            },
          },
          product: {
            include: {

              media: true,
            }
          }
        }
      },
      shippingAddress: true,
      billingAddress: true,
      payment: true
    },
  });
};

exports.updateOrderStatus = async (id, req) => {
  const { status, isCancelled, isPaid } = req.body;
  const order = await prisma.order.findUnique({
    where: { id }, include: {
      items: true,
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  if (!order) {
    throw new Error("Order not found");
  }


  if (!order.isCancelled && isCancelled) {

    await Promise.all(
      order.items.map(item =>
        prisma.stock.update({
          where: { productId: item.productId },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        })
      )
    );

    // if (order.couponCode) {
    //   await prisma.coupon.update({
    //     where: { id:couponCode },
    //     data: {
    //       couponCount: {
    //         increment: 1,
    //       },
    //     },
    //   });
    // }
  }
  return await prisma.order.update({
    where: { id },
    data: { status, isCancelled, isPaid },
  });

};

exports.deleteOrder = async (id) => {
  await prisma.orderItem.deleteMany({
    where: {
      orderId: id,
    },
  });

  await prisma.order.delete({
    where: {
      id: id,
    },
  });
};


exports.fetchUserOrder = async (req, res) => {
  const userId = req.user.id;
  return await prisma.order.findMany({
    where: { userId: userId },
    include: {
      items: {

        include: {
          attributes: {
            include: {
              productAttributeValue: {
                include: { attributeDefinition: true },
              },
            },
          },
          product: {
            include: {
              media: true,
            }
          }
        }
      },
      shippingAddress: true,
      billingAddress: true,
      payment: true
    },
  });
};
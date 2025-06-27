const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { format, startOfMonth } = require('date-fns');
exports.fetchDashboardSummary = async () => {

    const revenueResult = await prisma.order.aggregate({
        _sum: {
            totalAmount: true,
        },
        where: {
            status: "DELIVERED",
            isCancelled: false,
            isPaid: true,
        },
    });


    const soldResult = await prisma.orderItem.aggregate({
        _sum: {
            quantity: true,
        },
        where: {
            order: {

                isCancelled: false,
                isPaid: true,
            },
        },
    });


    const lastMonthRevenue = await prisma.order.aggregate({
        _sum: {
            totalAmount: true,
        },
        where: {
            status: "DELIVERED",
            isCancelled: false,
            isPaid: true,
        },
    });

    const totalRevenue = revenueResult._sum.totalAmount || 0;
    const productsSold = soldResult._sum.quantity || 0;
    const lastMonth = lastMonthRevenue._sum.totalAmount || 1;

    const growthPercentage = ((totalRevenue - lastMonth) / lastMonth) * 100;

    return {
        totalRevenue,
        productsSold,
        growth: {
            percentage: Number(growthPercentage.toFixed(2)),
            trend: growthPercentage >= 0 ? 'up' : 'down',
        },
    };
};



exports.fetchMonthlyMetrics = async () => {
    const orders = await prisma.order.findMany({
      include: {
        payment: true,
      },
    });
  
    const monthlyMap = {};
  
    for (const order of orders) {
      const month = format(startOfMonth(order.placedAt), 'yyyy-MM');
  
      if (!monthlyMap[month]) {
        monthlyMap[month] = {
          userIds: new Set(),
          totalRevenue: 0,
          totalCashflow: 0,
        };
      }
  
      if (order.userId) {
        monthlyMap[month].userIds.add(order.userId);
      }
  
      monthlyMap[month].totalRevenue += order.totalAmount;
      if (order.payment?.isActive) {
        monthlyMap[month].totalCashflow += order.payment.amount;
      }
    }
  

    const now = new Date();
    const currentYear = now.getFullYear();
    const allMonths = Array.from({ length: 12 }, (_, i) =>
      format(new Date(currentYear, i, 1), 'yyyy-MM')
    );
  
    const monthlyMetrics = allMonths.map((month) => {
      const data = monthlyMap[month];
      return {
        month,
        userCount: data ? data.userIds.size : 0,
        totalRevenue: data ? data.totalRevenue : 0,
        totalCashflow: data ? data.totalCashflow : 0,
      };
    });
  
    return monthlyMetrics;
  };
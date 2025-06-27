const ROLES = {
    SUPERADMIN: 'SUPERADMIN',
    CUSTOMER: 'CUSTOMER',
  };
  
  const hasRole = (user, ...allowedRoles) => {
    if (!user || !user.role) return false;
    return allowedRoles.includes(user.role);
  };
  
  module.exports = {
    ROLES,
    hasRole,
  };
  
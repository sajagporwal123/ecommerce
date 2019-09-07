const accountConstant = {
  accountStatus: ['ACTIVE', 'INACTIVE', 'BLACKLIST'],
  defaultAccountStatus: 'ACTIVE',
  accountType: ['CUSTOMER', 'MANAGER', 'ADMIN'],
  defaultAccountType: 'CUSTOMER',
};
const orderConstant = {
  status: ['SUCCESS', 'FAILED', 'CANCELLED'],
  defaultStatus: 'SUCCESS',
};
module.exports = {
  accountConstant, orderConstant,
};

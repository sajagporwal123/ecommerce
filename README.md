# ecommerce

1. Rename sample.env to .env
2. put all environment in .env file 
3. create database
4. Create Account & Inventory by using below queries


// Account Create
INSERT INTO `ecommerce`.`account` (`email`, `firstName`, `lastName`, `mobileNo`, `password`, `status`, `type`,`createdAt`,`updatedAt`) VALUES ('sajagporwal123@gmail.com', 'sajag', 'porwal', '8764004296', '123456', 'ACTIVE', 'CUSTOMER',current_timestamp(),current_timestamp());

// Inventory Create
INSERT INTO `ecommerce`.`inventory` (`productCode`, `name`, `price`, `availableQuantity`, `createdAt`, `updatedAt`) VALUES ('P1', 'mango', '12', '10', current_timestamp(), current_timestamp());
INSERT INTO `ecommerce`.`inventory` (`productCode`, `name`, `price`, `availableQuantity`, `createdAt`, `updatedAt`) VALUES ('P2', 'apple', '22.50', '15', current_timestamp(), current_timestamp());

5. Create Order Api 
API URI = http://localhost:4000/api/v1/order/create // use port which is added in .env file

Request Body Sample

{
    "state":"Gujrat",
	"address":"test,test",
	"accountId":1,
	"pincode":123456,
	"orderList":[{
		"quantity":1,
		"inventoryId":1
	},
	{
		"quantity":1,
		"inventoryId":2
	}]
}
const AddressSchema = require("../SchemaModels/AddressSchema");
const _ = require("lodash");

const addAddress = (req, res) => {
  AddressSchema.findOne({ user: req.user })
    .then(async (doc) => {
      if (doc) {
        if (req.body.shippingAddress) {
          let shipping = Object.fromEntries(
            Object.entries(req.body.shippingAddress).map(([key, value]) => [
              key,
              typeof value === String ? value.toLowerCase() : value,
            ])
          );

          for (let address of doc.shippingAddresses) {
            let addrss = _.omit(address.toObject(), ["_id", "createdAt"]);
            var shippingExist = _.isEqual(
              JSON.stringify(addrss),
              JSON.stringify(shipping)
            );
          }

          if (!shippingExist) {
            await doc.shippingAddresses.push(req.body.shippingAddress);
          }
        }

        if (req.body.billingAddress) {
          let billing = Object.fromEntries(
            Object.entries(req.body.billingAddress).map(([key, value]) => [
              key,
              typeof value === String ? value.toLowerCase() : value,
            ])
          );

          for (let address of doc.billingAddresses) {
            let addrss = _.omit(address.toObject(), ["_id", "createdAt"]);
            var billingExist = _.isEqual(
              JSON.stringify(addrss),
              JSON.stringify(billing)
            );
          }

          if (!billingExist) {
            await doc.billingAddresses.push(req.body.billingAddress);
          }
        }

        await doc.save();
        return res.send(doc);
      } else {
        let doc = await new AddressSchema({
          user: req.user,
          shippingAddresses: req.body.shippingAddress && [
            req.body.shippingAddress,
          ],
          billingAddresses: req.body.billingAddress && [
            req.body.billingAddress,
          ],
        }).save();

        return res.send(doc);
      }
    })
    .catch((error) => {
      // console.log(error)
      return res.status(500).send(error.message);
    });
};

const getAddresses = (req, res) => {
  AddressSchema.findOne({ user: req.user })
    .then((doc) => {
      return res.send(doc);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send(error.message);
    });
};

const removeAddress = (req, res) => {
  AddressSchema.findOne({ user: req.user })
    .then(async (doc) => {
      let shipping = doc.shippingAddresses.filter(
        (address) => address._id != req.params.addressId
      );
      let billing = doc.billingAddresses.filter(
        (address) => address._id != req.params.addressId
      );

      if (shipping.length !== 0 || billing.length !== 0) {
        doc.shippingAddresses = shipping;
        doc.billingAddresses = billing;
        await doc.save();
        return res.send(doc);
      } else {
        await AddressSchema.deleteOne({ user: req.user });
        return res.send({ message: "Address removed Successfully" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send(error.message);
    });
};

module.exports.addAddress = addAddress;
module.exports.getAddresses = getAddresses;
module.exports.removeAddress = removeAddress;

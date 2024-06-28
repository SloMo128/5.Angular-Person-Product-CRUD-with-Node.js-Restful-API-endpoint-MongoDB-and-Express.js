const Product = require('../Models/product.model');

function isEmpty(obj) {
    /*
      for (var prop in obj) {
          if (obj.hasOwnProperty(prop))
              return false;
      }
    */

    // Check if an Object is Empty with JSON.stringify()
    // This will return true if the object is empty, otherwise false
    return JSON.stringify(obj) === JSON.stringify({});
}

exports.findByQuery = (req, res) => {
    const person_id = req.params.person_id;

    Product.find({ person: person_id })
        .then(product => {
            if (product.length === 0) {
                return res.status(404).json({
                    message: `Product with this Person id ${person_id} not found `
                });
            }
            res.send(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving Product."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;  // Extract id from request parameters

    Product.findById(id)
        .then(product => {  // Use 'person' to refer to the found person
            if (isEmpty(product)) {
                return res.status(404).send({
                    message: `Product not found with id ${id}`
                });
            }
            res.send(product);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while retrieving the product."
            });
        });
};

exports.create = (req, res) => {
    Product.create(req.body)
        .then(product => {
            res.send(product);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating the Person."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { new: true })
        .then(product => {
            if (isEmpty(product)) {
                return res.status(404).send({
                    message: `Person not found with id ${id}`
                });
            }
            res.send(req.body);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Person with id ${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(product => {
            if (isEmpty(product)) {
                return res.status(404).send({
                    message: `Person not found with id ${id}`
                });
            }
            res.send({ message: `Person with id: ${id} was deleted successfully.` });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error deleting Person with id ${id}`
            });
        });
};
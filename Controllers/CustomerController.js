const Customer = require("../Models/CustomerModels");
const bcrypt = require("bcrypt");

async function register(req, res, next) {
  // console.log(req);
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  let newCustomer = new Customer({
    email: req.body.email,
    password: hashPassword,
    orders: [],
    totalAmount: 0,
    totalItems: 0,
  });

  await newCustomer
    .save()
    .then(() => {
      // req.session.isAuth = true;
      // req.session.mail = req.body.email;
      res.json({ message: "Registration successfull" });
    })
    .then(() => console.log("account created successfully"))
    .catch((error) => {
      console.log(error);
      res.json({ message: "Registeration unsuccessfull" });
    });
}

function show(req, res, next) {
  Customer.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

async function login(req, res, next) {
  console.log("incoming request for logging in");
  const user = await Customer.findOne(
    { email: req.body.email },
    { email: 1, password: 1, orders: 1, totalAmount: 1, totalItems: 1 }
  );
  if (!user) {
    res.status(501);
    res.json({ message: "No user found" });
  } else {
    const match = await bcrypt.compare(req.body.password, user["password"]);
    if (match) {
      console.log("password correct");
      req.session.isAuth = true;
      req.session.mail = req.body.email;
      res.json({ message: "login success" });
    } else {
      console.log("password Incorrect");
      res.json({ message: "login unsuccess" });
    }
  }
}

function getData(req, res) {
  const mail = req.session.mail;
  Customer.findOne(
    { email: mail },
    { orders: 1, totalAmount: 1, totalItems: 1, _id: 0 }
  ).then((response) => {
    console.log("Sending Data");
    res.json(response);
  });
}

const session = (req, res) => {
  console.log(req.session);
};

function login2(req, res) {
  if (req.session.isAuth) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
}

function logout(req, res) {
  console.log(req.session.mail + " logging out");
  req.session.destroy((err) => {
    if (err) throw err;
    res.json({ message: "logout success" });
  });
}

function updateOrder(req, res) {
  Customer.updateOne(
    { email: req.session.mail },
    {
      $set: {
        orders: req.body.orders,
        totalAmount: req.body.Amount,
        totalItems: req.body.Item,
      },
    }
  ).then(() => {
    console.log("Order updated");
    res.json({ message: "success" });
  });
}

module.exports = {
  updateOrder,
  register,
  show,
  login,
  login2,
  logout,
  getData,
  session,
};

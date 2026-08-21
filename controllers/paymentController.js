export async function transitPayment(req, res) {
  try {
    console.log(json.parse({ name: "Muzammil" }));
    res.send({
      name: "Muzammil ALi",
    });
  } catch (err) {
    console.log(err.message);
  }
}

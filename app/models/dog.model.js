module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: String,
      birthdate: String,
      sex: String
    },
    { timestamps: true }
  );

  schema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Dog = mongoose.model('dog', schema);
  return Dog;
};

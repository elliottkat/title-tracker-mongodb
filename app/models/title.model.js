module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      venue: String,
      title: String,
      name: String
    },
    { timestamps: true }
  );

  schema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Title = mongoose.model('title', schema);
  return Title;
};

const ratings = require("../data/ratings-data");

const ratingExists = (req, res, next) => {
  const { ratingId } = req.params;
  const foundRating = ratings.find(r => r.id === Number(ratingId));
  if (foundRating) {
    res.locals.rating = foundRating;
    return next();
  } else {
    next({
      status: 404,
      message: `Rating id not found: ${ratingId}`
    });
  };
};

const list = (req, res, next) => {
  const { noteId } = req.params;
  res.json({ data: ratings.filter(noteId ? rating => rating.noteId == noteId : () => true) });
}

const read = (req, res, next) => {
  res.json({ data: res.locals.rating });
}

module.exports = {
  list,
  read: [ratingExists, read],
  ratingExists
}
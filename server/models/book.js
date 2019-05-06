const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    published_date: {type: Date, default: Date.now}
}
// ,{collection: 'COLLECTION_NAME'} //collection 이름을 임의로 정의하는 경우
);

//'book': 해당 document가 사용할 collection의 단수적 표현. 즉 이 모델에서는 books collection을 사용
module.exports = mongoose.model('book', bookSchema);
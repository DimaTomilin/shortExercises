class Book{
    constructor(_title, _genre, _author, _read, _date = undefined){
        this.title = _title;
        this.genre = _genre;
        this.author = _author;
        this.read = _read;
        this.date = _date;
    }

    forget(){
        this.read = false;
        return this
    }
}

class Booklist {
    constructor(_numberRead, _numberNotRead, _nextBook, _currentBook, _lastBook,  _arrayBooks){
        this.numberRead = _numberRead;
        this.numberNotRead = _numberNotRead;
        this.nextBook = _nextBook;
        this.currentBook = _currentBook;
        this.lastBook = _lastBook;
        this.arrayBooks = _arrayBooks;
    }
    
    changeNextBook(){
        this.nextBook = this.arrayBooks.find((book)=>{
            if(book.read === false && book!==this.currentBook){
                 return book
            } else {
                console.log("You finished all books in this booklist. Please add new books.")
                return 
            }
        }) 
        return this
    }

    add(book){
        this.arrayBooks.push(book)
        if(book.read){
            this.numberRead++
        } else {
            this.numberNotRead++
        }
        return this
    }

    finishedCurrentBook(){
        this.numberRead++;
        this.numberNotRead--;
        this.currentBook.read = true;
        this.lastBook = this.currentBook
        this.currentBook = this.nextBook
        this.changeNextBook()
        return this
    }

    delete(book){
        if(book.read){
            this.numberRead--
        } else {
            this.numberNotRead--
        }
        switch (book) {
            case this.nextBook:
                this.changeNextBook()
                break;
            case this.currentBook:
                this.currentBook = this.nextBook
                this.changeNextBook()
                break; 
            default:
                break;
        }
        this.arrayBooks.splice(this.arrayBooks.indexOf(book), 1)
        return this
    }
}
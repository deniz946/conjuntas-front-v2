import { environment } from './../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit  {
  @Input() private packId: string;
  @Input() backButton = true;
  public selectedBook: string;
  public books: any[] = [];
  public currentPack: any = {};
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe(param => {
      this.packId = param.id;
      this.selectedBook = param.bookId;
      console.log(this.selectedBook);
    });
  }

  ngOnInit() {
    this.getBooks();
    this.getCurrentPack();
  }

  checkSelectedBook() {
    if(this.selectedBook) {
      const bookPos = this.books.findIndex(b => b.id === this.selectedBook);
      const book = this.books[bookPos];
      this.books.splice(bookPos, 1);
      this.books.unshift(book);
    }
  }

  getBooks() {
    this.http.get(`${environment.API}public/packs/books/${this.packId}`)
      .subscribe(
      (books: any) => {
        this.books = books;
        this.checkSelectedBook();
      }
      );
  }

  completeDescription(book: any) {
    const newWindow = window.open();
    newWindow.document.write(`<h1> ${book.title}: </h1> <br> <img width="150px" src="${book.thumbnail}"> <br> ${book.description}`);
  }

  getCurrentPack() {
    this.http.get(environment.API + 'public/packs' + '/' + this.packId).subscribe((pack: any) => {
      this.currentPack = pack;
    });
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

}

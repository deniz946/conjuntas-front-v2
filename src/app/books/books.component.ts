import { environment } from './../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  @Input() private packId: string;
  @Input() backButton = true;
  public books: any[] = [];
  public currentPack: any = {};
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe(param => this.packId = param.id);
  }

  ngOnInit() {
    this.getBooks();
    this.getCurrentPack();
  }

  getBooks() {
    this.http.get(`${environment.API}pack/books/${this.packId}`)
      .subscribe(
      (books: any) => this.books = books
      );
  }

  completeDescription(book: any) {
    const newWindow = window.open();
    newWindow.document.write(`<h1> ${book.title}: </h1> <br> <img width="150px" src="${book.thumbnail}"> <br> ${book.description}`);
  }

  getCurrentPack() {
    this.http.get(environment.API + 'pack' + '/' + this.packId).subscribe((pack: any) => {
      this.currentPack = pack;
    });
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

}

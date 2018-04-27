import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, map, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import UIkit from 'uikit';
import { ActivePackService } from '../core/services/active-pack.service';
import { Book } from '../core/models/Book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchInput: string;
  public books: Book[] = [];
  public foundBooks: Book[];
  public searchValue: Subject<string> = new Subject();
  public searchValue$: Observable<string> = this.searchValue
    .asObservable()
    .pipe(distinctUntilChanged())
    .pipe(debounceTime(500));
  constructor(private activePack: ActivePackService) { }

  ngOnInit() {
    this.getBooks();
    this.searchValue$.subscribe((value: string) => {
      if (this.books.length && (value && value.length)) {
        this.foundBooks = [];
        this.books.forEach((book: Book) => {
          if ((book.title.toLocaleLowerCase()).includes(value)) {
            this.foundBooks.push(book);
          }
        });
      } else {
        this.foundBooks = [];
      }

    });
  }

  getBooks() {
    this.activePack.getBooks()
      .subscribe(
      (books: Book[]) => {
        this.books = books;
        const input = document.getElementById('searchInput');
      }
      );
  }

  searchBook(query: string) {
    this.searchValue.next(query);
  }

  onBlur(): void {
    setTimeout(() => this.foundBooks = [], 500);
  }

}

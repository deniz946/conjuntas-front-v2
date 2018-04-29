import { Pack } from './../core/models/Pack';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
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
  @Input()
  set packs(packs: Pack[]) {
    this._packs = packs;
  }

  get packs(): Pack[] {
    return this._packs;
  }
  public searchInput: string;
  public books: Book[] = [];
  text: string;
  results: string[];
  public foundBooks: Book[];
  public searchValue: Subject<string> = new Subject();
  public searchValue$: Observable<string> = this.searchValue
    .asObservable()
    .pipe(distinctUntilChanged())
    .pipe(debounceTime(500));
  private _packs: Pack[];
  constructor(private activePack: ActivePackService) { }

  ngOnInit() {
    this.getBooks();
    this.searchValue$.subscribe((value: string) => {
      if (this.books.length && (value && value.length)) {
        this.foundBooks = [];
        this.results = [];
        const aux_results = [];
        this.books.forEach((book: Book) => {
          if ((book.title.toLocaleLowerCase()).includes(value)) {
            aux_results.push(book);
          }
        });
        this.results = aux_results;
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
      }
      );
  }

  searchBook(query: string) {
    this.searchValue.next(query);
  }

  goToPack(book: Book): void {
    const packOfBook = this.packs.find(pack => !!pack.books.find(b => b.id === book.id));
    if(packOfBook) {
      this.showBooks(packOfBook, book.id);
    }
  }

  showBooks(pack: Pack, bookId: string): void {
    this.text = '';
    window.open(`${window.location.href}books/${pack._id}/${bookId}`);
  }

  onBlur(): void {
    setTimeout(() => this.foundBooks = [], 500);
  }

}

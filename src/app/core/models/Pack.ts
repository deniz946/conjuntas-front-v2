import { Book } from './Book';
export class Pack {
  created_at: Date;
  dateEnd: Date;
  email_title: string;
  finished: boolean;
  link: string;
  _id?: string;
  name: string;
  books?: Book[];
  paypal: string;
  users: any[];
  comments: string[];
}

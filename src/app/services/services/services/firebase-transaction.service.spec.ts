import { TestBed } from '@angular/core/testing';

import { FirebaseTransactionService } from './firebase-transaction.service';

describe('FirebaseTransactionService', () => {
  let service: FirebaseTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

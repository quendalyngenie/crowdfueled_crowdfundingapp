import { TestBed } from '@angular/core/testing';

import { FirebaseCampaignService } from './firebase-campaign.service';

describe('FirebaseCampaignService', () => {
  let service: FirebaseCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

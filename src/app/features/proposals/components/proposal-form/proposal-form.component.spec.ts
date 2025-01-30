import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ProposalFormComponent } from './proposal-form.component';

@Component({
  selector: 'app-test-proposal-form',
  template: ''
})
class TestProposalFormComponent extends ProposalFormComponent {
  public onSubmitProposal(): void {}
}

describe('ProposalFormComponent', () => {
  let component: TestProposalFormComponent;
  let fixture: ComponentFixture<TestProposalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestProposalFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestProposalFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
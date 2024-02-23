import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Portrait } from '../../domain/portrait.entity';
import { VoteService } from '../../services/vote.service';
import { HttpClientModule } from '@angular/common/http';
import { Vote } from '../../domain/vote.entity';

@Component({
  selector: 'elections-vote',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss',
  providers: [VoteService]
})
export class VoteComponent implements OnInit {
  candidatesP: Portrait[] = [
  ]
  candidatesR: Portrait[] = [
  ]

  vote: Vote = { personero: -1, representative: -1 }

  sended = false
  canSendAnotherVote: boolean = false;
  timeLeft: number = 20

  constructor(private voteService: VoteService) { }

  ngOnInit(): void {
    this.voteService.getPersoneros().subscribe(
      {
        next: (c) => this.candidatesP = c,
        error: (e) => console.error(e)
      }
    )
    this.voteService.getRepresentatives().subscribe(
      {
        next: (c) => this.candidatesR = c,
        error: (e) => console.error(e)
      }
    )
  }

  selectP(index: number) {
    this.vote.personero = index + 1
  }

  selectR(index: number) {
    this.vote.representative = index + 1
  }

  sendVote() {
    this.voteService.sendVote(this.vote).subscribe({
      next: () => {
        this.sended = true
        this.startTimer()
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  startTimer() {
    this.canSendAnotherVote = false
    const interval = setInterval(() => {
      this.timeLeft--
      if (this.timeLeft === 0) {
        clearInterval(interval)
        this.canSendAnotherVote = true
        this.timeLeft = 20
      }
    }, 1000)
  }

  reset() {
    this.sended = false
    this.vote = { personero: -1, representative: -1 }
  }
}

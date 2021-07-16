import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import {FormGroup , FormControl, Validators, FormBuilder} from '@angular/forms' ;
import { MatIconRegistry } from '@angular/material/icon';
import {QuestionService} from '../services/question.service';
import {NotificationService} from '../notification/notification.service';
import {Router} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer,  SafeHtml,  SafeUrl, SafeStyle } from '@angular/platform-browser'; 

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  visibility:boolean = false; 
  errorMessage:String=''; 
  correctAnswer = false;
  questionNumber: any;
  message: any;
  imageCount:any;
  images: any = [];
  images1:any = [];
  disableClueButton = true;
  getClueToken = false;
  flipClues:boolean=false; 
  loading:boolean=true;
  finish:boolean=false; 
playerType:any; 

clue:any = []; 
  


 imgFetch:boolean = true ; 
 imageData:any; 
  slideData = [
    {
      id: 382,
      name: 'Metal bluetooth cyan',
    }, {
      id: 822,
      name: 'Avon',
    }, {
      id: 159,
      name: 'Infrastructures',
    }, {
      id: 424,
      name: 'Users Cotton',
    }];

    config: SwiperOptions = {
      pagination: { el: '.swiper-pagination', clickable: true },
      autoHeight: true,
      allowTouchMove: true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: true
      },
      breakpoints: {
        1024: {
          slidesPerView: 1
        },
        500: {
          slidesPerView: 1
        },
        400: {
          slidesPerView: 1
        },
        300: {
          slidesPerView: 1
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: false
    };

  constructor(private fb: FormBuilder, private _question: QuestionService,
              private router: Router , protected _notificationSvc: NotificationService, 
              private sanitizer:DomSanitizer ) {}
  answerForm: FormGroup = this.fb.group({
    answer: ['', [Validators.required, Validators.pattern('^[a-z0-9]*$')]]
  });
  ngOnInit() {

    this.fetchLevel();


  }

  fetchLevel()
{    this.loading= true;  
   
     this._question.fetchQuestionRequest().subscribe(
      async data => {
      
        this.questionNumber = data.qno;
        this.message = data.message;
        this.imageCount = data.count;
        this.playerType=data.type; 
        this.checkLevel(); 
        if (this.imageCount > 0)
        {               for(let i=1; i<=this.imageCount; i++)
                        { this.fetchImg(i);
                        }
          }
        this.loading=false; 
      }, 
      err => {
        this.visibility=true; 
        this.errorMessage=err.toString();
      
      }
    );

}


async fetchImg(i:any){
  await this._question.fetchImage(i.toString())
        .then(  
            (data) => {
                              let objectURL = URL.createObjectURL(data); 
                              this.images[i-1] = this.sanitizer.bypassSecurityTrustUrl(objectURL) ; 

                            }
                  ); 

}


  checkLevel(){

     if (this.questionNumber >= 14 && this.imageCount<= 0)
     {  
            this.finish=true;
    
       }

     // tslint:disable-next-line: max-line-length
     else if ( (this.questionNumber === 6 && this.playerType === 'WATSON') || (this.questionNumber === 13 && this.playerType ==='SHERLOCK')) 
     {   this._notificationSvc.info('INFO:', 'This Level contains Audio Clues');
         this.disableClueButton = false;
     }



  }

  audioClue(){
    if (this.questionNumber == 6 && this.playerType==='WATSON')
    {
         window.open('https://drive.google.com/file/d/1l01zmTPcESTv03OTupmYLDlGTYjsMJ-w/view?usp=sharing', '_blank');

    }
    else if (this.questionNumber == 13 && this.playerType==='SHERLOCK')
    {
      window.open( 'https://drive.google.com/file/d/1zMhqjl3bag-o-8V00xbVqabJtegQzOHM/view?usp=sharing',  '_blank'); 

    }

  }

  clickClues(){
                        if(!this.getClueToken)
                        {
                              this._question.getClues().subscribe(
                                (data) => {

                                                      const clueObj = JSON.parse(JSON.stringify(data.clues));
                                                      // tslint:disable-next-line: forin
                                                      for(let key in clueObj) 
                                                      {         this.clue.push(clueObj[key]); 
                                                      }
                                                      this.getClueToken = true;
                                                      this.flipClues=true;
                                                    },
                                (err) => {
                                }); 
                        } 
                        else {
                          this.flipClues = true;
                        }
}




  onSubmitAnswer(){
    if (!this.answerForm.valid) {
      return;
    }
    const answerData = { 'answer': this.answerForm.value.answer};
    this._question.checkAnswerGiven(answerData).subscribe(
      data => {
         if (this.questionNumber === 14 && data.message === 'Right Answer! Details updated'  )
         {    this._notificationSvc.success('Submission Successful:', 'You have Completed the Game!');
              this.finish=true;
        }
        else if (this.questionNumber < 14 && data.message === 'Right Answer! Details updated'){
          this._notificationSvc.success('Submission Successful:', 'Answer Correct!! ');
          const currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
         }
         else if (data.message ===  'Wrong answer!' )
         {    this._notificationSvc.error('Submission Unsuccessful:', 'Wrong Answer. Be Mindful of the number of times you submit the answer :) ');

         }

      },

      err => {
       
      }
      );



  }


  reload(){
    window.location.reload();
  }

flipForAnswer(){
  this.flipClues=false;
}

routeLeaderboard(){
  this.router.navigate(['/leaderboard']);
}


}
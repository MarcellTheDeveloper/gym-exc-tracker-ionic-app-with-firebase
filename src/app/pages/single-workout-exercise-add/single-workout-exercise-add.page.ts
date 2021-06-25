import { ExcerciseItem } from './../../interfaces/excercise-item';
import { Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GymDayHandlerService } from 'src/app/services/gym-day-handler.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-single-workout-exercise-add',
  templateUrl: './single-workout-exercise-add.page.html',
  styleUrls: ['./single-workout-exercise-add.page.scss'],
})
export class SingleWorkoutExerciseAddPage implements OnInit, OnDestroy {
  @Input() day: string;
  activeCurrentDaySub;
  formValues: ExcerciseItem = {
    name: '',
    bodyPart: '',
    sets: 0,
    reps: 0,
    weight: 0,
    img: 'https://image.made-in-china.com/2f0j00jNStbZyclpkT/Sport-Seated-Bicep-Curl-Machine-Sports-Machine-Exercise-for-Biceps.jpg',
  };
  constructor(
    private dayHandler: GymDayHandlerService,
    private router: Router,
    public alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.activeCurrentDaySub = this.dayHandler.activeCurrentDay.subscribe(
      (day) => (this.day = day)
    );
  }

  async goBackToHomePage() {
    if (
      this.formValues.name ||
      this.formValues.reps ||
      this.formValues.sets ||
      this.formValues.weight
    ) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm',
        message: 'Are you sure you want to leave what you have started?',
        buttons: [
          {
            text: 'No i stay thanks',
            role: 'cancel',
            cssClass: 'noIDontBtn',
            handler: () => {},
          },
          {
            text: 'Yes i do',
            cssClass: 'yesIDoBtn',
            handler: () => {
              this.formValues = {
                name: '',
                bodyPart: '',
                sets: 0,
                reps: 0,
                weight: 0,
                // eslint-disable-next-line max-len
                img: 'https://image.made-in-china.com/2f0j00jNStbZyclpkT/Sport-Seated-Bicep-Curl-Machine-Sports-Machine-Exercise-for-Biceps.jpg',
              };
              this.modalController.dismiss({
                dismissed: true,
              });
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.formValues = {
        name: '',
        bodyPart: '',
        sets: 0,
        reps: 0,
        weight: 0,
        img: 'https://image.made-in-china.com/2f0j00jNStbZyclpkT/Sport-Seated-Bicep-Curl-Machine-Sports-Machine-Exercise-for-Biceps.jpg',
      };
      this.modalController.dismiss({
        dismissed: true,
      });
    }
  }

  valueChanger(name: string, change: boolean) {
    if (name === 'reps') {
      if (change) {
        this.formValues.reps++;
      }
      if (!change && this.formValues.reps > 0) {
        this.formValues.reps--;
      }
    }

    if (name === 'weight') {
      if (change) {
        this.formValues.weight++;
      }
      if (!change && this.formValues.weight > 0) {
        this.formValues.weight--;
      }
    }

    if (name === 'sets') {
      if (change) {
        this.formValues.sets++;
      }
      if (!change && this.formValues.sets > 0) {
        this.formValues.sets--;
      }
    }
  }

  async saveExercise() {
    if (
      this.formValues.name &&
      this.formValues.sets &&
      this.formValues.reps &&
      this.formValues.weight
    ) {
      this.dayHandler.addExercise(this.day.toLowerCase(), this.formValues);
      this.formValues = {
        name: '',
        bodyPart: '',
        sets: 0,
        reps: 0,
        weight: 0,
        img: 'https://image.made-in-china.com/2f0j00jNStbZyclpkT/Sport-Seated-Bicep-Curl-Machine-Sports-Machine-Exercise-for-Biceps.jpg',
      };
      this.modalController.dismiss({
        dismissed: true,
      });
    } else {
      const alert = await this.alertController.create({
        cssClass: 'yesIDoBtn',
        header: 'Error',
        // subHeader: 'Subtitle',
        message: 'Before saving please fill all the required fields!',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  ngOnDestroy() {
    this.activeCurrentDaySub.unsubscribe();
  }
}

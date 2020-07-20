import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from '../material.module';
import { RegisterExciseComponent } from './register-excise/register-excise.component';
import { RegisterComponent } from './register-vat/register.component';
import { SafePipe } from '../constants/safe.pipe';
import { NotifierOptions, NotifierModule } from 'angular-notifier';


const notifierDefaultOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: "right",
			distance: 12
		},
		vertical: {
			position: "top",
			distance: 12,
			gap: 10
		}
	},
	theme: "material",
	behaviour: {
		autoHide: 5000,
		onClick: false,
		onMouseover: "pauseAutoHide",
		showDismissButton: true,
		stacking: 4
	},
	animations: {
		enabled: true,
		show: {
			preset: "slide",
			speed: 300,
			easing: "ease"
		},
		hide: {
			preset: "fade",
			speed: 300,
			easing: "ease",
			offset: 50
		},
		shift: {
			speed: 300,
			easing: "ease"
		},
		overlap: 150
	}
};


@NgModule({
  declarations: [
    RegisterExciseComponent,
    RegisterComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    NotifierModule.withConfig(notifierDefaultOptions),

  ]
})
export class RegisterModule { }

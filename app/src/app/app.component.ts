import { Component } from "@angular/core";
import { environment } from "src/environments/environment";
import { GeneratorService } from "./generator.service";

@Component({
  selector: "app-root",
  template: `
    <div style="text-align:center" class="content">
      <h1>CATSIFY</h1>
      <app-flip-board [value]="generator?.name" [max]="20"></app-flip-board>
      <button [class.show]="showButton" class="button" (click)="generate()">Give me a name</button>
      <a
        *ngIf="generator?.ready"
        class="button"
        href="https://twitter.com/intent/tweet?text=My new cat's name will be... {{ generator?.name }}! Find yours at https://www.catsify.app (by @manekinekko) %23MSBuild"
        rel="noopener"
        target="__blank"
        >Tweet!</a
      >
    </div>
  `,
  styles: [
    `
      app-flip-board {
        margin: 6em 1em;
        display: block;
      }
      h1 {
        font-size: 6em;
        color: transparent;
        text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
        background-clip: text;
        margin-top: 0;
      }
      button {
        opacity: 0;
        transition: 1s opacity;
      }
      button.show {
        opacity: 1;
      }
      .button {
        display: inline-block;
        padding: 15px;
        margin-right: 5px;
        background: #965e74;
        text-decoration: none;
        cursor: pointer;
        border: none;
        outline: none;
        color: white;
        font-weight: 400;
        font-size: 20px;
        border-radius: 3px;
        box-shadow: 0 5px 0px #674050;
        border-bottom: 2px solid #412933;
        text-transform: uppercase;
        font-family: arial, sans-serif;
      }
      .button:hover {
        background: #2e7a94;
        box-shadow: 0 4px 1px #2e7a94;
        border-bottom: 2px solid #2a7088;
        transition: all 0.1s ease-in;
      }
      .button:active {
        transform: translateY(4px);
        border-bottom-width: 2px;
        box-shadow: none;
      }
    `,
  ],
})
export class AppComponent {
  generator: { name: string; ready: boolean };
  showButton: boolean;

  constructor(private readonly generatorService: GeneratorService) { }

  ngOnInit() {
    this.showButton = false;
    setTimeout((_) => {
      // wait till the component is loaded and then show the message
      this.generator = { name: "Cat Names Generator!", ready: false };
    }, 100);

    setTimeout((_) => {
      this.showButton = true;
    }, 4000);
  }
  async generate() {
    let { noun = '', adjective = '' } = {};
    try {
      ({ noun, adjective } = await (await fetch(environment.api)).json());
    }
    catch (e) {
      ({ noun, adjective } = this.generatorService.generate());
    }

    this.generator = {
      name: `${this.camelCase(adjective)} ${this.camelCase(noun)}`,
      ready: true,
    };
  }

  private camelCase(value: string) {
    // value is already in lower case
    return value[0].toUpperCase() + value.slice(1);
  }
}

import { Component, Input, ViewChild, ElementRef, SimpleChanges } from "@angular/core";
import Tick from "@pqina/flip";

@Component({
  selector: "app-flip-board",
  template: `
    <div #tick class="tick">
      <div data-repeat="true" data-layout="horizontal center" data-transform="upper -> split -> delay(ltr, 100, 300)">
        <span data-view="flip" class="tick-char"></span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }

      .tick {
        font-size: 1rem;
        white-space: nowrap;
        font-family: arial, sans-serif;
      }

      .tick-flip,
      .tick-text-inline {
        font-size: 2.5em;
      }

      .tick-label {
        margin-top: 1em;
        font-size: 1em;
      }

      .tick-char {
        width: 1.5em;
      }

      .tick-text-inline {
        display: inline-block;
        text-align: center;
        min-width: 1em;
      }

      .tick-text-inline + .tick-text-inline {
        margin-left: -0.325em;
      }

      .tick-group {
        margin: 0 0.5em;
        text-align: center;
      }

      .tick-text-inline {
        color: #595d63 !important;
      }

      .tick-label {
        color: #595d63 !important;
      }

      .tick-flip-panel {
        color: #fff !important;
      }

      .tick-flip {
        font-family: !important;
      }

      .tick-flip-panel-text-wrapper {
        line-height: 1.45 !important;
      }

      .tick-flip-panel {
        background-color: #3c3e3c !important;
      }

      .tick-flip {
        border-radius: 0.12em !important;
      }
    `,
  ],
})
export class FlipBoardComponent {
  @Input("value") value = "...";
  @Input("max") maxChars = 20;
  @ViewChild("tick", {
    static: true,
  })
  tickRef: ElementRef;
  @ViewChild("audio", {
    static: true,
  })
  audioRef: ElementRef<HTMLAudioElement>;

  tick: Tick;

  audio: any;

  constructor() {
    this.audio = new Audio("assets/flip.wav");
    
    // We need to mute the audio first in order to avoid the following exception.
    // We will unmute it just before playing the effect (see below).
    // DOMException: play() failed because the user didn't interact with the document first.
    this.audio.muted = true;
  }

  ngOnInit() {
    this.tick = Tick.DOM.create(this.tickRef.nativeElement, {
      value: this.padBetween(this.value || ""),
      didUpdate: () => {
        this.effect(this.tickRef.nativeElement);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.tick && changes?.value?.currentValue) {
      let value: string = changes.value.currentValue;
      this.tick.value = this.padBetween(value);
    }
  }

  private effect(targetNode: HTMLElement) {
    this.audio.muted = false;
    const config = { childList: true, subtree: true };
    const tick = () => setTimeout((_) => this.audio.play(), 0);
    const callback = (mutationsList: any, observer: any) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.target.dataset['view'] && mutation.removedNodes.length === 0) {
          tick();
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }

  private padBetween(str: string) {
    let spaces = this.maxChars - str.length;
    let padLeft = spaces / 2 + str.length;
    return str.padStart(padLeft).padEnd(this.maxChars);
  }
}

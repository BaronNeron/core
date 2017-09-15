// external
import { DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { TestComponent } from './test.component';
import { TestModule } from './test.module';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('TestComponent', () => {

  let comp: TestComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    // get from fixture
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('should be defined', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));
  it('should have `prism-highlight` html tag', async(() => {
    expect(nativeElement.querySelector('prism-highlight')).toBeTruthy();
  }));
  it('should have `language` property defined', async(() => {
    expect(comp.language).toBe('html');
  }));
  it('should have component `ng-content` changed.', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('code').innerText).toBe(comp.content);
  }));

  // Test `code` property.
  it('should have component property `code` with css working.', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('prism-highlight[id="css"]').innerText).toContain(`text-align`);
  }));
  it('should have component property `code` with html working.', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('prism-highlight[id="html"]').innerText).toContain(`My p`);
    console.info(nativeElement.querySelector('prism-highlight[id="interpolation"]').innerText);
  }));
  it('should have component property `code` with html and interpolation working.', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('prism-highlight[id="interpolation"]').innerText).toContain(`My p ${comp.language}`);
  }));
});

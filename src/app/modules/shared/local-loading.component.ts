import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-local-loading',
    template: `
    <div *ngIf="loading" class="local-loading-overlay">
            <div class="spinner" role="status" aria-hidden="true"></div>
        </div>
    `,
    styles: [
        `
        .local-loading-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.7);
            z-index: 999;
            pointer-events: auto;
        }
            .spinner {
                width: 48px;
                height: 48px;
                border: 6px solid #6ca5d6ff;
                border-top-color: #1d70b9ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                box-shadow: 0 0 12px rgba(0,0,0,0.2);
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `
    ]
})

export class LocalLoadingComponent {
    @Input() loading: boolean = false;
}
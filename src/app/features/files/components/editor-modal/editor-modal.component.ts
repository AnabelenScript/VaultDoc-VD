import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { ImageItem, Point } from '../../../../core/models/image-item.model';
import { ScannerService } from '../../../../core/services/scanner/scanner.service';

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.css']
})
export class EditorModalComponent {
  @Input() image!: ImageItem;
  @Output() close = new EventEmitter<void>();

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('img') imgRef!: ElementRef<HTMLImageElement>;

  points: Point[] = [];
  loading = true;
  transforming = false;
  resultPreview?: string;
  isEditing = false;
  showTransformSuccess = false;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private draggedPointIndex: number | null = null;
  private readonly POINT_RADIUS = 8;
  private readonly POINT_COLOR = '#019885';
  private readonly POLYGON_COLOR = '#019885';
  private readonly POLYGON_OPACITY = 0.2;

  private originalImageWidth = 0;
  private originalImageHeight = 0;

  private isFinitePoint(p: Point): boolean {
    return Number.isFinite(p?.x) && Number.isFinite(p?.y);
  }

  private sanitizePoints(points: Point[]): Point[] {
    return points
      .map((p) => ({ x: Number(p?.x), y: Number(p?.y) }))
      .filter((p) => this.isFinitePoint(p));
  }

  constructor(
    private scannerService: ScannerService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    if (this.image.transformedPreview) {
      this.resultPreview = this.image.transformedPreview;
      this.loading = false;
      this.isEditing = false;
      this.showTransformSuccess = false;
    } else {
      this.isEditing = true;
      this.detectCorners();
    }
  }

  ngAfterViewInit() {
    // El canvas se inicializa en setupCanvas después de que loading sea false
  }

  private detectCorners() {
    const img = new Image();
    img.onload = () => {
      this.originalImageWidth = img.naturalWidth;
      this.originalImageHeight = img.naturalHeight;

      this.scannerService.detectCorners(this.image.file).subscribe(
        (res) => {
          console.log('Detected corners:', res);
          if (res?.corners && res.corners.length === 4) {
            this.points = res.corners.map((p: any) => {
              if (Array.isArray(p) && Array.isArray(p[0])) {
                return { x: Number(p[0][0]), y: Number(p[0][1]) };
              }
              if (Array.isArray(p)) {
                return { x: Number(p[0]), y: Number(p[1]) };
              }
              return { x: Number(p.x), y: Number(p.y) };
            });
            this.image.corners = [...this.points];
          } else {
            this.points = [
              { x: 50, y: 50 },
              { x: this.originalImageWidth - 50, y: 50 },
              { x: this.originalImageWidth - 50, y: this.originalImageHeight - 50 },
              { x: 50, y: this.originalImageHeight - 50 }
            ];
          }

          this.loading = false;
          this.cdr.detectChanges();

          setTimeout(() => {
            this.initCanvas();
          }, 100);
        },
        (err) => {
          console.error('Error detectando esquinas:', err);
          this.points = [
            { x: 50, y: 50 },
            { x: this.originalImageWidth - 50, y: 50 },
            { x: this.originalImageWidth - 50, y: this.originalImageHeight - 50 },
            { x: 50, y: this.originalImageHeight - 50 }
          ];
          this.loading = false;
          this.cdr.detectChanges();

          setTimeout(() => {
            this.initCanvas();
          }, 100);
        }
      );
    };
    img.src = this.image.previewUrl;
  }

  private initCanvas() {
    if (!this.canvasRef || !this.imgRef) {
      return;
    }
    
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setupCanvas();
  }

  private setupCanvas() {
    const img = this.imgRef.nativeElement;

    if (img.complete) {
      this.initializeCanvas(img);
    } else {
      img.onload = () => {
        this.initializeCanvas(img);
      };
    }
  }

  private initializeCanvas(img: HTMLImageElement) {
    // Wait until the image has actual layout dimensions (not just natural size)
    const displayWidth = img.offsetWidth || img.clientWidth;
    const displayHeight = img.offsetHeight || img.clientHeight;

    if (displayWidth <= 0 || displayHeight <= 0) {
      setTimeout(() => this.initializeCanvas(img), 50);
      return;
    }

    this.canvas.width = Math.round(displayWidth);
    this.canvas.height = Math.round(displayHeight);
    
    if (this.originalImageWidth === 0) {
      this.originalImageWidth = img.naturalWidth;
      this.originalImageHeight = img.naturalHeight;
    }
    
    this.scalePointsToCanvas();
    this.drawCanvas();
  }

  private scalePointsToCanvas() {
    if (this.originalImageWidth === 0 || this.originalImageHeight === 0) return;
    if (this.canvas.width <= 0 || this.canvas.height <= 0) return;
    
    const scaleX = this.canvas.width / this.originalImageWidth;
    const scaleY = this.canvas.height / this.originalImageHeight;

    if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) return;
    
    this.points = this.sanitizePoints(this.points).map(p => ({
      x: p.x * scaleX,
      y: p.y * scaleY
    }));
  }

  private scalePointsToOriginal(): Point[] {
    if (this.originalImageWidth === 0 || this.originalImageHeight === 0) {
      return this.sanitizePoints(this.points);
    }

    const canvasWidth = this.canvas?.width ?? 0;
    const canvasHeight = this.canvas?.height ?? 0;

    if (canvasWidth <= 0 || canvasHeight <= 0) {
      return this.sanitizePoints(this.points).map((p) => ({
        x: Math.round(p.x),
        y: Math.round(p.y),
      }));
    }
    
    const scaleX = this.originalImageWidth / canvasWidth;
    const scaleY = this.originalImageHeight / canvasHeight;

    if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) {
      return this.sanitizePoints(this.points).map((p) => ({
        x: Math.round(p.x),
        y: Math.round(p.y),
      }));
    }
    
    return this.sanitizePoints(this.points).map(p => ({
      x: Math.round(p.x * scaleX),
      y: Math.round(p.y * scaleY)
    }));
  }

  private drawCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.points.length === 4) {
      this.drawPolygon();
    }

    this.points.forEach((point) => {
      this.drawPoint(point);
    });
  }

  private drawPolygon() {
    this.ctx.fillStyle = this.POLYGON_COLOR + Math.round(this.POLYGON_OPACITY * 255).toString(16).padStart(2, '0');
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.strokeStyle = this.POLYGON_COLOR;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private drawPoint(point: Point) {
    this.ctx.fillStyle = this.POINT_COLOR;
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, this.POINT_RADIUS, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private getCanvasCoords(event: MouseEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  onCanvasMouseDown(event: MouseEvent) {
    const { x, y } = this.getCanvasCoords(event);

    for (let i = 0; i < this.points.length; i++) {
      const dx = this.points[i].x - x;
      const dy = this.points[i].y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= this.POINT_RADIUS * 2) {
        this.draggedPointIndex = i;
        break;
      }
    }
  }

  onCanvasMouseMove(event: MouseEvent) {
    if (this.draggedPointIndex === null) return;

    const { x, y } = this.getCanvasCoords(event);

    this.points[this.draggedPointIndex].x = Math.max(0, Math.min(x, this.canvas.width));
    this.points[this.draggedPointIndex].y = Math.max(0, Math.min(y, this.canvas.height));

    this.drawCanvas();
  }

  onCanvasMouseUp() {
    this.draggedPointIndex = null;
  }

  save() {
    if (this.points.length !== 4) return;

    this.transforming = true;
    this.isEditing = false;
    this.cdr.detectChanges();
    
    const originalPoints = this.scalePointsToOriginal();
    const validPoints = originalPoints.filter((p) => this.isFinitePoint(p));

    if (validPoints.length !== 4) {
      console.error('Puntos inválidos para transformación:', originalPoints);
      this.transforming = false;
      this.isEditing = true;
      this.cdr.detectChanges();
      return;
    }
    
    this.scannerService.transformPerspective(this.image.file, validPoints).subscribe(
      (res) => {
        this.ngZone.run(() => {
          const base64Image = res?.transformed_image || res?.image;
          if (base64Image) {
            const preview = base64Image.startsWith('data:')
              ? base64Image
              : `data:image/jpeg;base64,${base64Image}`;
            this.resultPreview = preview;
            this.image.transformedPreview = preview;
            this.image.status = 'ready';
            this.image.corners = validPoints;
          }
          this.transforming = false;
          this.showTransformSuccess = true;
          this.cdr.detectChanges();
        });
      },
      (err) => {
        console.error('Error transformando:', err);
        this.ngZone.run(() => {
          this.transforming = false;
          this.isEditing = true;
          this.cdr.detectChanges();
        });
      }
    );
  }

  closeModal() {
    this.close.emit();
  }

  enterEditMode() {
    this.isEditing = true;
    this.showTransformSuccess = false;
    this.cdr.detectChanges();
    
    setTimeout(() => {
      this.initCanvas();
    }, 100);
  }
}

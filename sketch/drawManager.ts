
/**
 * Contains static methods to handle drawing of the world.
 * Including working out zoom levels
 */
class DrawManager {
    private static worldCoordToRealCoord(coord: p5.Vector) {
        return createVector(DrawManager.worldXToRealX(coord.x),
        DrawManager.worldYToRealY(coord.y));
    }

    private static worldXToRealX(x: number): number {
        const worldDisplacement = Camera.getInstance().getDisplacement();
        const xDisplacement = x - worldDisplacement.x;
        return xDisplacement * Camera.getInstance().getZoom();
    }

    private static worldYToRealY(y: number): number {
        const worldDisplacement = Camera.getInstance().getDisplacement();
        const yDisplacement = y - worldDisplacement.y;
        return yDisplacement * Camera.getInstance().getZoom();
    }

    private static worldDimToRealDim(dim: number): number {
        return dim * Camera.getInstance().getZoom();
    }

    public static drawCircle(worldX: number, worldY: number, worldRadius: number) {
        const realX = DrawManager.worldXToRealX(worldX);
        const realY = DrawManager.worldYToRealY(worldY);
        const realRadius = DrawManager.worldDimToRealDim(worldRadius);
        circle(realX, realY, realRadius);
    }

    public static drawLine(from: p5.Vector, to: p5.Vector) {
        const realFrom = DrawManager.worldCoordToRealCoord(from);
        const realTo = DrawManager.worldCoordToRealCoord(to);
        line(realFrom.x, realFrom.y, realTo.x, realTo.y);
    }
}
var Rotate = /** @class */ (function () {
    function Rotate() {
        var _this = this;
        this.isRotate = true;
        this.stop = function () {
            _this.isRotate = false;
        };
        this.update = function () {
            if (_this.model && _this.isRotate) {
                _this.model.rotation.y += 0.01;
            }
        };
    }
    return Rotate;
}());
export default Rotate;

var Rotate = /** @class */ (function () {
    function Rotate() {
        var _this = this;
        this.isRotate = true;
        this.switch = function () {
            _this.isRotate = !_this.isRotate;
        };
        this.update = function (model) {
            if (model && _this.isRotate) {
                model.rotation.y += 0.01;
            }
        };
    }
    return Rotate;
}());
export default Rotate;

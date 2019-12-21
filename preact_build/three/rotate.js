var Rotate = /** @class */ (function () {
    function Rotate() {
        var _this = this;
        this.isRotate = true;
        this.stop = function () {
            _this.isRotate = false;
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

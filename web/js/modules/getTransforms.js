/**
 * Retrieves element transformation as a matrix
 *
 * Note that this will only take translate and rotate in account,
 * also it always reports px and deg, never % or turn!
 *
 * @return string matrix
 * @param selector
 */
const cssToMatrix = function (item) {
    const style = window.getComputedStyle(item);

    return style.getPropertyValue("-webkit-transform") ||
        style.getPropertyValue("-moz-transform") ||
        style.getPropertyValue("-ms-transform") ||
        style.getPropertyValue("-o-transform") ||
        style.getPropertyValue("transform");
};

/**
 * Transforms matrix into an object
 *
 * @return object
 * @param matrix
 */
const matrixToTransformObj = function (matrix) {
    // this happens when there was no rotation yet in CSS
    if (matrix === 'none') {
        matrix = 'matrix(0,0,0,0,0)';
    }
    let obj = {},
        values = matrix.match(/([-+]?[\d\.]+)/g);

    obj.rotate = (Math.round(
                Math.atan2(
                    parseFloat(values[1]),
                    parseFloat(values[0])) * (180 / Math.PI)) || 0
        ).toString() + 'deg';
    obj.translate = values[5] ? values[4] + 'px, ' + values[5] + 'px' : (values[4] ? values[4] + 'px' : '');

    return obj;
};

function getTransforms(item) {
    const matrix = cssToMatrix(item);
    const transformObj = matrixToTransformObj(matrix);
    [transformObj.translateX, transformObj.translateY] = transformObj.translate.split(',');
    return transformObj
};
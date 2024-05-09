attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

varying vec3 normal;
varying vec3 worldPosition;

void main()
{
    gl_Position = projection * view * model * vec4(aPosition, 1.0);
    worldPosition = vec3(model * vec4(aPosition, 1.0));
    normal = vec3(model * vec4(aNormal, 0.0));
}
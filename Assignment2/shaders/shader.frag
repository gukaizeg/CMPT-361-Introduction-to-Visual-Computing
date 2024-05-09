precision mediump float;

varying vec3 normal;
varying vec3 worldPosition;

uniform vec3 color;

uniform vec3 pointLightPosition;

uniform vec3 spotLightPosition;
uniform vec3 spotLightDirection;
uniform float spotLightCutOff;
uniform vec3 spotLightColor;
uniform vec3 pointLightColor;

uniform vec3 eye;

uniform bool drawLight;

void main()
{
    vec3 l = normalize(pointLightPosition - worldPosition);
    vec3 n = normalize(normal);

    vec3 r = reflect(-l, n);
    vec3 v = normalize(eye - worldPosition);

    float diffuse = max(dot(n, l), 0.0);
    float specular = pow(max(dot(r, v), 0.0), 128.0);

    vec3 finalColor = vec3(diffuse + specular) * pointLightColor;

    l = normalize(spotLightPosition - worldPosition);

    float theta = dot(l, normalize(-spotLightDirection));

    if (theta > spotLightCutOff)
    {
        diffuse = max(dot(n, l), 0.0);

        r = reflect(-l, n);

        specular = pow(max(dot(r, v), 0.0), 128.0);

        finalColor += diffuse * 0.25 * spotLightColor;
        finalColor += specular * 0.25 * spotLightColor;
    }

    if (drawLight)
    {
        gl_FragColor = vec4(color, 1.0);
    }
    else
    {
        gl_FragColor = vec4(finalColor * color, 1.0);
    }
}
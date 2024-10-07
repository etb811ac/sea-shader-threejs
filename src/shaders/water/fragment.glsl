uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main() {
    #include <colorspace_fragment>
    vec3 color = mix(uDepthColor, uSurfaceColor, (vElevation + uColorOffset) * uColorMultiplier);

    gl_FragColor = vec4(color, 0.8);
}
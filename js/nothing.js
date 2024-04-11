mat4.multiply=function(a,b,c){
    c||(c=a);
    var d=a[0],
    e=a[1],
    g=a[2],
    f=a[3],
    h=a[4],
    i=a[5],
    j=a[6],
    k=a[7],
    l=a[8],
    o=a[9],
    m=a[10],
    n=a[11],
    p=a[12],
    r=a[13],
    s=a[14];
    a=a[15];
    var A=b[0],
    B=b[1],
    t=b[2],
    u=b[3],
    v=b[4],
    w=b[5],
    x=b[6],
    y=b[7],
    z=b[8],
    C=b[9],
    D=b[10],
    E=b[11],
    q=b[12],
    F=b[13],
    G=b[14];
    b=b[15];
    c[0]=A*d+B*h+t*l+u*p; // a0*b0 + a4*b1 + a8*b2 + a12*b3
    c[1]=A*e+B*i+t*o+u*r; // a1*b0 + a5*b1 + a9*b2 + a13*b3
    c[2]=A*g+B*j+t*m+u*s;
    c[3]=A*f+B*k+t*n+u*a;
    c[4]=v*d+w*h+x*l+y*p;
    c[5]=v*e+w*i+x*o+y*r;
    c[6]=v*g+w*j+x*m+y*s;
    c[7]=v*f+w*k+x*n+y*a;
    c[8]=z*d+C*h+D*l+E*p;
    c[9]=z*e+C*i+D*o+E*r;
    c[10]=z*g+C*j+D*m+E*s;
    c[11]=z*f+C*k+D*n+E*a;
    c[12]=q*d+F*h+G*l+b*p;
    c[13]=q*e+F*i+G*o+b*r;
    c[14]=q*g+F*j+G*m+b*s;
    c[15]=q*f+F*k+G*n+b*a;return c}


vec3.cross=function(a,b,c){
    c||(c=a);
    var d=a[0],e=a[1];
    a=a[2];
    var g=b[0],f=b[1];
    b=b[2];
    c[0]=e*b-a*f;
    c[1]=a*g-d*b;
    c[2]=d*f-e*g;
    return c};


mat4.perspective=function(a,b,c,d,e){
    // a: vfov, b: aspect, c: near, d: far
    a=c*Math.tan(a*Math.PI/360);
    b=a*b;
    return mat4.frustum(-b,b,-a,a,c,d,e)
};

frustum(out, left, right, bottom, top, near, far)

mat4.frustum=function(a,b,c,d,e,g,f){
    f||(f=mat4.create());
    var h=b-a,i=d-c,j=g-e;

    f[0]=e*2/h;f[1]=0;f[2]=0;f[3]=0;
    f[4]=0;f[5]=e*2/i;f[6]=0;f[7]=0;
    f[8]=(b+a)/h;f[9]=(d+c)/i;f[10]=-(g+e)/j;f[11]=-1;
    f[12]=0;f[13]=0;f[14]=-(g*e*2)/j;f[15]=0;
    return f};

mat4.ortho=function(a,b,c,d,e,g,f){
    f||(f=mat4.create());
    var h=b-a,i=d-c,j=g-e;
    f[0]=2/h;f[1]=0;f[2]=0;f[3]=0;
    f[4]=0;f[5]=2/i;f[6]=0;f[7]=0;
    f[8]=0;f[9]=0;f[10]=-2/j;f[11]=0;
    f[12]=-(a+b)/h;f[13]=-(d+c)/i;f[14]=-(g+e)/j;f[15]=1;
    return f};
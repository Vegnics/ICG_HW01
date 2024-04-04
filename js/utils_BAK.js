class CGObject{
    constructor(id=0, name="", trans_vec=null, rotate_vec=null, scale_vec=null, shear_vec=null,orient_vec=null, abs_scale=1.0) {
        
        this.id = id;
        this.name = name;
        
        this.VertexPositionBuffer;
        this.VertexNormalBuffer;
        this.VertexFrontColorBuffer;
        this.vertexTextureCoordBuffer;
        
        this.orientation_vec = orient_vec;
        this.translation_vec = trans_vec;
        this.rotate_vec = rotate_vec;
        this.scale_vec = scale_vec;
        this.absScale = abs_scale;
        this.shear_vec = shear_vec;

        this.mvMatrix = mat4.create();

        this.relOrientMat = mat4.create();
        this.relRotateMat = mat4.create();
        mat4.identity(this.relRotateMat);
        this.relScaleMat = mat4.create();
        
        this.relmvMatrix = mat4.create();
        //this.absRotMatrix = mat4.create();
        //mat4.identity(this.absRotMatrix);
        this.raxis = 0;
        this.orientMat = mat4.create();
        this.pMatrix  = mat4.create();
        this.texture  = "NONE";
        // nothingetrreg
    }

    set_translation_vec(trans_vec){  this.translation_vec = trans_vec;}

    set_rotate_vec(rotate_vec){ this.rotate_vec = rotate_vec; }

    set_scale_vec(scale_vec){ this.scale_vec = scale_vec;}

    set_shear_vec(shear_vec){  this.shear_vec = shear_vec; }

    translation(){ 
        mat4.translate(this.mvMatrix, this.translation_vec);
        
    }


    orientation(){
        // Use the relative positioning matrixdd
        //console.log("Object %d",this.id);
        //var car = mat4.create([1.,0.,0.,0.,0.,2.,0.,0.,0.,0.,3.,0.,0.,0.,0.,4.]);
        //var car2 = mat4.create([1.,0.,0.,0.,1.,1.,0.,0.,1.,1.,1.,0.,1.,1.,1.,1.]);
        //var car3 = mat4.create();
        //mat4.multiply(car,car2,car3);
        //console.log(mat4.str(car3));
        var _relmvMat = mat4.create(); 
        mat4.identity(_relmvMat);
        var ox = degToRad(this.orientation_vec[0]);
        var oy = degToRad(this.orientation_vec[1]);
        var oz = degToRad(this.orientation_vec[2]);
        mat4.rotate(_relmvMat,ox,[1,0,0]);
        mat4.rotate(_relmvMat,oy,[0,1,0]);
        mat4.rotate(_relmvMat,oz,[0,0,1]);
        mat4.clone(_relmvMat,this.orientMat);
    }

    rotation(){
        //Relative rotation for animation
        mat4.identity(this.relRotateMat);
        var rx = degToRad(this.rotate_vec[0]);
        mat4.rotate(this.relRotateMat, rx, [1, 0, 0]);
        var ry = degToRad(this.rotate_vec[1]);
        mat4.rotate(this.relRotateMat, ry, [0, 1, 0]);
        var rz = degToRad(this.rotate_vec[2]);
        mat4.rotate(this.relRotateMat, rz, [0, 0, 1]);
    }

    orient(){
        mat4.multiply(this.orientMat,this.relRotateMat,this.orientMat);
    }

    scalerm(){
        //Scale according to the original orientation 
        var _scaleMat = mat4.create();
        mat4.identity(_scaleMat);
        mat4.clone(this.orientMat,_scaleMat);
        //mat4.inverse(this.orientMat,invOrient);
        var absScaled_vec = [this.absScale,this.absScale,this.absScale]; 
        for(var i=0;i<3;i++){
            absScaled_vec[i]*=this.scale_vec[i];
        }
        mat4.scale(_scaleMat,absScaled_vec);
        //mat4.multiply(_scaleMat,this.relOrientMat,_scaleMat);
        //mat4.multiply(_scaleMat,invOrient,_scaleMat);
        mat4.clone(_scaleMat,this.relScaleMat);
        //mat4.multiply(_relMat,this.relRotMatrix,_relMat);
        //mat4.multiply(_relMat,invOrient,this.absRotMatrix);
        //mat4.scale(_relMat,absScaled_vec);
        //mat4.multiply(_relMat,invOrient,this.relmvMatrix);
        
        //mat4.clone(this.relmvMatrix,this.absRotMatrix); 
    }

    scale(){
        /*var scale_1 = vec3.create([1.0,1.0,1.0]);
        mat4.scale(this.mvMatrix,scale_1); 
        */
        var absScaled_vec = [this.absScale,this.absScale,this.absScale]; 
        for(var i=0;i<3;i++){
            absScaled_vec[i]*=this.scale_vec[i];
        }
        mat4.scale(this.mvMatrix,absScaled_vec);
    }

    shear(){
        var cotx =  1 / Math.tan(degToRad(this.shear_vec[0]));
        var coty =  1 / Math.tan(degToRad(this.shear_vec[1]));
        var cotz =  1 / Math.tan(degToRad(this.shear_vec[2]));
        mat4.multiply(this.mvMatrix, mat4.create([1, 0, cotz, 0, cotx, 1, 0, 0, 0, coty, 1, 0, 0, 0, 0, 1]));
    }

    merge(){
        // Merge transformations
        var invOrient = mat4.inverse(this.orientMat);
        var trans_mat = mat4.create();
        mat4.identity(trans_mat);
        mat4.translate(trans_mat,this.translation_vec);
        mat4.multiply(this.mvMatrix,this.relScaleMat,this.mvMatrix);
        //mat4.multiply(this.mvMatrix,this.relOrientMat,this.mvMatrix);
        mat4.multiply(this.mvMatrix,this.relRotateMat,this.mvMatrix); 
        mat4.multiply(this.mvMatrix,invOrient,this.mvMatrix);
        mat4.multiply(trans_mat,this.mvMatrix,this.mvMatrix);
    }
}

class LightObject{
    constructor(position=null, color=null) {
        this.position = position;
        this.color = color;
    }

    set_position(position){
        this.position = position;
    }

    set_color(color){
        this.color = color;
    }
}

class LightArray{
    lights = []
    
    add_light(light){
        this.lights.push(light);
    }

    size(){
        return this.lights.length;
    }

    access_light(idx){
        if(idx >= this.size()){
            throw 'index out of limited.';
        }

        return this.lights[idx];
    }
}
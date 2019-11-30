<template>
  <div class="container">
    <div class="inputs">
      <div class="circle-input">
        <p>Circle</p>
        <label for>
          Weight :
          <input
            type="number"
            v-model="$store.state.circle.weight"
            @change="()=>{ if($store.state.circle.weight>10 ) {$store.state.circle.weight =parseInt($store.state.circle.weight) - 1;}else if($store.state.circle.weight<1 ) {$store.state.circle.weight =parseInt($store.state.circle.weight) + 1;}}"
          />
        </label>
        <label for>
          position(arrow keys) :
          <input
            type="text"
            v-model="$store.state.circle.position"
            v-on:keyup.37="(e)=>{ $store.state.circle.position =  checkDownLimit(e,$store.state.circle.position);}"
            v-on:keyup.38="(e)=>{ $store.state.circle.position =  checkUpLimit(e,$store.state.circle.position);}"
            v-on:keyup.39="(e)=>{ $store.state.circle.position =  checkUpLimit(e,$store.state.circle.position);}"
            v-on:keyup.40="(e)=>{ $store.state.circle.position =  checkDownLimit(e,$store.state.circle.position);}"
          />
        </label>
      </div>
      <div class="triangle-input">
        <p>triangle</p>
        <label for>
          Weight :
          <input type="number" v-model="$store.state.triangle.weight" />
        </label>
        <label for>
          position(arrow keys) :
          <input
            type="text"
            v-model="$store.state.triangle.position"
            v-on:keyup.37="(e)=>{ $store.state.triangle.position =  checkDownLimit(e,$store.state.triangle.position);}"
            v-on:keyup.38="(e)=>{ $store.state.triangle.position =  checkUpLimit(e,$store.state.triangle.position);}"
            v-on:keyup.39="(e)=>{ $store.state.triangle.position =  checkUpLimit(e,$store.state.triangle.position);}"
            v-on:keyup.40="(e)=>{ $store.state.triangle.position =  checkDownLimit(e,$store.state.triangle.position);}"
          />
        </label>
      </div>
      <div class="rectangle-input">
        <p>rectangle</p>
        <label for>
          Weight :
          <input type="number" v-model="$store.state.rectangle.weight" />
        </label>
        <label for>
          position(arrow keys) :
          <input
            type="text"
            v-model="$store.state.rectangle.position"
            v-on:keyup.37="(e)=>{ $store.state.rectangle.position =  checkDownLimit(e,$store.state.rectangle.position);}"
            v-on:keyup.38="(e)=>{ $store.state.rectangle.position =  checkUpLimit(e,$store.state.rectangle.position);}"
            v-on:keyup.39="(e)=>{ $store.state.rectangle.position =  checkUpLimit(e,$store.state.rectangle.position);}"
            v-on:keyup.40="(e)=>{ $store.state.rectangle.position =  checkDownLimit(e,$store.state.rectangle.position);}"
          />
        </label>
      </div>
    </div>
    <div class="shape-container">
      <app-triangle></app-triangle>
      <app-circle></app-circle>
      <app-rectangle></app-rectangle>
    </div>
    <div class="line" :style="{transform: 'rotate('+ this.calcLineAngle() * (180/100) + 'deg)'}"></div>

    <div
      class="shape triangle center"
      style="height: 100px;
            borderLeft: 50px solid transparent;
            borderRight: 50px solid transparent;
            borderBottom: 100px solid black;
            position:relative;
            width:100px;"
    ></div>
    <div class="weights">
      <span>Weight * Position : {{ leftSide }}</span>
      <span
        :style="{color : lineAnglePercentage() == 'Not Possible' ? 'red':'green'}"
        style="font-weight:bold;font-size:20px"
      >{{ lineAnglePercentage() }}</span>
      <span>Weight * Position : {{ rightSide }}</span>
    </div>
    <br />
  </div>
</template>

<script>
import Triangle from "./components/triangle";
import Circle from "./components/circle";
import Rectangle from "./components/rectangle";

export default {
  data() {
    return {
      selectedShape: ""
    };
  },
  watch: {
    leftSide(newVal) {
      if (
        newVal > 20 ||
        (this.calcLineAngle() > 3 || this.calcLineAngle() < -3)
      ) {
        if (confirm("Not Balanced Or More Than 20. Continue?")) {
          return false;
        } else {
          window.close();
        }
      }
    },
    rightSide() {
      if (
        this.leftSide > 20 ||
        (this.calcLineAngle() > 3 || this.calcLineAngle() < -3)
      ) {
        if (confirm("ot Balanced Or More Than 20. Continue?")) {
          return false;
        } else {
          window.close();
        }
      }
    }
  },
  computed: {
    leftSide() {
      return (
        parseInt(
          this.$store.state.triangle.weight *
            this.$store.state.triangle.position
        ) +
        parseInt(
          this.$store.state.circle.weight * this.$store.state.circle.position
        )
      );
    },
    rightSide() {
      return parseInt(
        this.$store.state.rectangle.weight *
          this.$store.state.rectangle.position
      );
    }
  },
  methods: {
    calcLineAngle() {
      return this.rightSide - this.leftSide;
    },
    lineAnglePercentage() {
      return (this.$store.state.lineAngle =
        this.calcLineAngle() > 3 || this.calcLineAngle() < -3
          ? "Not Possible"
          : this.calcLineAngle() * 10 + "%");
    },
    checkDownLimit(e, val) {
      e.stopPropagation();
      if (val <= 0) return val;
      return (val -= 1);
    },
    checkUpLimit(e, val) {
      e.stopPropagation();
      if (val >= 5) return val;
      return (val += 1);
    }
  },
  components: {
    appTriangle: Triangle,
    appRectangle: Rectangle,
    appCircle: Circle
  }
};
</script>

<style>
.container {
  width: 80%;
  margin: 0 auto;
}
.shape-container {
  height: 100px;
  position: relative;
}
.inputs {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 100px;
}
.inputs div {
  border: 1px solid gray;
  padding: 10px;
}
.line {
  width: 100%;
  height: 2px;
  background: black;
  position: relative;
  margin-top: 20px;
  transition: 0.3s;
}
.shape {
  position: absolute;
  transition: 0.6s;
}

.triangle.center {
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.weights {
  display: flex;
  justify-content: space-between;
}
</style>

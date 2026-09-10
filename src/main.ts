const rotations = {
  africa: { x: 0, y: -110, z: 0 },
  "north-america": { x: 30, y: 10, z: 0 },
  "south-america": { x: 0, y: -20, z: 0 },
  europe: { x: -35, y: -135, z: 0 },
  asia: { x: -20, y: -175, z: 0 },
  australia: { x: 25, y: -225, z: 0 },
};

const continentFacts = {
  africa: {
    name: "Africa",
    fact: "Africa is the second-largest continent by both area and population. It is home to the Sahara, the world's largest hot desert.",
  },

  europe: {
    name: "Europe",
    fact: "Europe is known for its rich history and cultural diversity. It contains many countries despite being one of the smaller continents.",
  },

  asia: {
    name: "Asia",
    fact: "Asia is the largest continent by both area and population. It contains more than half of the world's population.",
  },

  "north-america": {
    name: "North America",
    fact: "North America includes countries such as Canada, the United States, and Mexico, and stretches from the Arctic to the tropics.",
  },

  "south-america": {
    name: "South America",
    fact: "South America is home to the Amazon rainforest and the Andes, the longest continental mountain range in the world.",
  },

  australia: {
    name: "Australia",
    fact: "Australia is the smallest continent and is known for its unique wildlife, including kangaroos, koalas, and wombats.",
  },
};
const sphere = document.querySelector("#sphere");
const select = document.querySelector("#continentSelect");

function switchContinent(continent) {
  const rotation = rotations[continent];

  sphere.setAttribute("animation", {
    property: "rotation",
    to: `${rotation.x} ${rotation.y} ${rotation.z}`,
    dur: 1000,
    easing: "easeInOutQuad",
  });
}
select.addEventListener("change", () => {
  const continent = select.value;

  if (!continent) return;

  const rotation = rotations[continent];

  sphere.setAttribute("animation", {
    property: "rotation",
    to: `${rotation.x} ${rotation.y} ${rotation.z}`,
    dur: 1000,
    easing: "easeInOutQuad",
  });
});
document.querySelector("#left").addEventListener("click", () => {
  const rotation = sphere.getAttribute("rotation");

  sphere.setAttribute("rotation", {
    x: rotation.x,
    y: rotation.y - 30,
    z: rotation.z,
  });
});

document.querySelector("#right").addEventListener("click", () => {
  const rotation = sphere.getAttribute("rotation");

  sphere.setAttribute("rotation", {
    x: rotation.x,
    y: rotation.y + 30,
    z: rotation.z,
  });
});
AFRAME.registerComponent("hotspot", {
  schema: {
    name: { type: "string" },
  },
  init: function () {
    this.el.addEventListener("click", (event) => {
      switchContinent(this.data.name);
      const continent = continentFacts[this.data.name];
      if (!continent) {
        console.log("No facts found for:", this.data.name);
        return;
      }

      document.querySelector("#continentName").textContent = continent.name;

      document.querySelector("#continentFact").textContent = continent.fact;

      document.querySelector("#infoPanel").style.display = "block";
    });
  },
});

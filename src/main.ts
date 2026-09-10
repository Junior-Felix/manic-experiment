declare const AFRAME: {
  registerComponent: (
    name: string,
    definition: {
      schema: Record<string, unknown>;
      init: () => void;
    },
  ) => void;
};

// A-Frame's custom elements are not fully understood by TypeScript,
// so we use HTMLElement and cast where necessary.
type AFrameEntity = HTMLElement & {
  getAttribute(name: "rotation"): {
    x: number;
    y: number;
    z: number;
  };

  setAttribute(name: string, value: string | Record<string, unknown>): void;
};
interface ContinentFact {
  name: string;
  fact: string;
  position: { x: number; y: number; z: number };
}

const continentFacts: Record<string, ContinentFact> = {
  africa: {
    name: "Africa",
    fact: "Africa is the second-largest continent by both area and population. It is home to the Sahara, the world's largest hot desert.",
    position: { x: 0, y: -110, z: 0 },
  },

  europe: {
    name: "Europe",
    fact: "Europe is known for its rich history and cultural diversity. It contains many countries despite being one of the smaller continents.",
    position: { x: -35, y: -135, z: 0 },
  },

  asia: {
    name: "Asia",
    fact: "Asia is the largest continent by both area and population. It contains more than half of the world's population.",
    position: { x: -20, y: -175, z: 0 },
  },

  "north-america": {
    name: "North America",
    fact: "North America includes countries such as Canada, the United States, and Mexico, and stretches from the Arctic to the tropics.",
    position: { x: 30, y: 10, z: 0 },
  },

  "south-america": {
    name: "South America",
    fact: "South America is home to the Amazon rainforest and the Andes, the longest continental mountain range in the world.",
    position: { x: 0, y: -20, z: 0 },
  },

  australia: {
    name: "Australia",
    fact: "Australia is the smallest continent and is known for its unique wildlife, including kangaroos, koalas, and wombats.",
    position: { x: 25, y: -225, z: 0 },
  },
};
const sphere = document.querySelector("#sphere") as AFrameEntity | null;
const select = document.querySelector(
  "#continentSelect",
) as HTMLSelectElement | null;
const leftButton = document.querySelector("#left") as HTMLButtonElement | null;

const rightButton = document.querySelector(
  "#right",
) as HTMLButtonElement | null;

const infoPanel = document.querySelector("#infoPanel") as HTMLElement | null;

const continentName = document.querySelector(
  "#continentName",
) as HTMLElement | null;

const continentFact = document.querySelector(
  "#continentFact",
) as HTMLElement | null;

const closeInfo = document.querySelector(
  "#closeInfo",
) as HTMLButtonElement | null;
function switchContinent(continent: string) {
  const rotation = continentFacts[continent].position;
  if (!sphere) {
    console.error("could not load sphere");
    return;
  }
  sphere.setAttribute("animation", {
    property: "rotation",
    to: `${rotation.x} ${rotation.y} ${rotation.z}`,
    dur: 1000,
    easing: "easeInOutQuad",
  });
}

select?.addEventListener("change", () => {
  const continent = select?.value;

  if (!continent) return;

  const rotation = continentFacts[continent].position;
  if (!sphere) {
    console.error("Could not load sphere");
    return;
  }
  sphere.setAttribute("animation", {
    property: "rotation",
    to: `${rotation.x} ${rotation.y} ${rotation.z}`,
    dur: 1000,
    easing: "easeInOutQuad",
  });
});
leftButton?.addEventListener("click", () => {
  if (!sphere) {
    console.error("Could not find sphere!");
    return;
  }
  const rotation = sphere.getAttribute("rotation");

  sphere.setAttribute("rotation", {
    x: rotation.x,
    y: rotation.y - 30,
    z: rotation.z,
  });
});

rightButton?.addEventListener("click", () => {
  const rotation = sphere?.getAttribute("rotation");

  sphere?.setAttribute("rotation", {
    x: rotation?.x,
    y: rotation ? rotation?.y + 30 : 0,
    z: rotation?.z,
  });
});

AFRAME.registerComponent("hotspot", {
  schema: {
    name: { type: "string" },
  },

  init: function () {
    const element = this as unknown as {
      el: HTMLElement;
      data: {
        name: string;
      };
    };

    element.el.addEventListener("click", () => {
      const continentNameValue = element.data.name;

      if (!continentFacts[continentNameValue]) {
        console.warn("No valid continent found for:", continentNameValue);
        return;
      }

      switchContinent(continentNameValue);

      const continent = continentFacts[continentNameValue];

      if (!continent) {
        console.log("No facts found for:", continentNameValue);
        return;
      }

      if (continentName) {
        continentName.textContent = continent.name;
      }

      if (continentFact) {
        continentFact.textContent = continent.fact;
      }

      if (infoPanel) {
        infoPanel.style.display = "block";
      }
    });
  },
});

closeInfo?.addEventListener("click", () => {
  if (infoPanel) {
    infoPanel.style.display = "none";
  }
});

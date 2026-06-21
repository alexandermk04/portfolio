/**
 * Decorative low-poly map of Europe for the LocationMap component.
 *
 * Coordinates are real lon/lat pairs projected with a simple equirectangular
 * projection. To change the visible extent (e.g. a world map for markers
 * outside Europe), adjust LON_MIN/LON_MAX/LAT_MIN/LAT_MAX — outlines and
 * markers reproject automatically.
 */

const LON_MIN = -11;
const LON_MAX = 32;
const LAT_MIN = 34;
const LAT_MAX = 62;

const WIDTH = 1000;
const HEIGHT = 840;

export const EUROPE_VIEWBOX = `0 0 ${WIDTH} ${HEIGHT}`;

export function project(lon: number, lat: number): { x: number; y: number } {
  return {
    x: Math.round(((lon - LON_MIN) / (LON_MAX - LON_MIN)) * WIDTH),
    y: Math.round(((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * HEIGHT),
  };
}

/**
 * Hand-simplified coastlines as lon/lat polygons (stylized, not survey-grade).
 * Order: continental Europe, Great Britain, Ireland, Scandinavia (clipped at
 * the top edge), Finland, Sicily, Sardinia, Corsica.
 */
const LANDMASSES: [number, number][][] = [
  [
    [-5.5, 36.0], [-6.3, 36.5], [-9.0, 37.0], [-9.4, 38.7], [-8.7, 41.1],
    [-9.3, 43.0], [-8.4, 43.4], [-5.7, 43.6], [-3.0, 43.4], [-1.5, 43.5],
    [-1.2, 44.6], [-1.2, 46.2], [-2.2, 47.1], [-4.8, 48.0], [-3.5, 48.8],
    [-1.6, 49.7], [0.1, 49.5], [1.9, 51.0], [4.0, 52.0], [6.5, 53.5],
    [8.1, 55.5], [10.6, 57.7], [10.2, 56.0], [9.5, 55.0], [12.0, 54.2],
    [16.0, 54.5], [18.8, 54.4], [20.5, 54.9], [21.0, 56.0], [24.0, 57.0],
    [24.5, 59.4], [30.0, 59.9], [32.0, 60.0], [32.0, 45.0], [29.0, 45.0],
    [28.0, 43.5], [28.0, 41.5], [26.0, 40.5], [24.0, 40.5], [23.0, 39.0],
    [23.7, 37.9], [22.0, 36.5], [20.5, 38.5], [19.5, 41.0], [16.0, 43.5],
    [13.8, 44.8], [12.5, 45.4], [14.0, 42.5], [16.0, 41.9], [18.5, 40.1],
    [16.5, 38.9], [15.6, 38.0], [15.0, 40.0], [14.2, 40.8], [11.8, 42.1],
    [8.9, 44.4], [7.0, 43.5], [5.3, 43.3], [3.0, 43.0], [2.0, 41.5],
    [-0.3, 39.5], [-0.7, 37.6], [-2.5, 36.8],
  ],
  [
    [-5.7, 50.1], [-3.0, 50.6], [1.3, 51.1], [1.7, 52.5], [0.2, 53.5],
    [-1.5, 55.0], [-2.0, 56.0], [-2.5, 57.7], [-4.0, 58.6], [-5.5, 58.2],
    [-5.0, 56.5], [-4.5, 55.5], [-3.0, 54.5], [-4.5, 53.3], [-5.2, 51.9],
    [-4.0, 51.2],
  ],
  [
    [-6.0, 52.2], [-10.0, 51.6], [-10.0, 53.5], [-8.2, 55.2], [-6.0, 55.2],
    [-6.0, 54.0],
  ],
  [
    [5.0, 62.0], [5.0, 61.0], [5.3, 60.0], [6.5, 58.2], [8.0, 58.1],
    [9.7, 59.0], [10.5, 59.2], [11.2, 58.4], [11.9, 57.7], [12.5, 56.3],
    [12.8, 55.4], [14.2, 55.4], [16.5, 56.2], [16.8, 57.5], [18.5, 59.3],
    [18.6, 60.5], [17.2, 61.5], [17.5, 62.0],
  ],
  [
    [22.5, 62.0], [21.3, 60.5], [24.9, 60.2], [27.7, 60.4], [30.5, 61.0],
    [31.5, 62.0],
  ],
  [
    [12.4, 38.0], [15.6, 38.3], [15.1, 36.7], [12.6, 37.6],
  ],
  [
    [8.2, 41.2], [9.5, 41.3], [9.6, 39.2], [8.4, 38.9],
  ],
  [
    [8.6, 43.0], [9.5, 42.7], [9.2, 41.4], [8.7, 41.5],
  ],
];

export const EUROPE_PATH = LANDMASSES.map(
  (polygon) =>
    `M${polygon
      .map(([lon, lat]) => {
        const { x, y } = project(lon, lat);
        return `${x} ${y}`;
      })
      .join("L")}Z`,
).join("");

/** Stable city ids referenced from messages/*.json (`city` fields). */
export const CITY_COORDS: Record<string, { lon: number; lat: number }> = {
  hamburg: { lon: 9.99, lat: 53.55 },
  berlin: { lon: 13.4, lat: 52.52 },
  munich: { lon: 11.58, lat: 48.14 },
  karlsruhe: { lon: 8.4, lat: 49.01 },
  stgallen: { lon: 9.38, lat: 47.42 },
  malaga: { lon: -4.42, lat: 36.72 },
};

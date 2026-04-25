export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 2;
export const MIN_SPEED = 50;

export interface Track {
  id: string;
  title: string;
  url: string;
}

export const AUDIO_TRACKS: Track[] = [
  {
    id: 'trk_01',
    title: 'AI_GEN_SEQ_01: VOID_WHISPERS.ogg',
    url: 'https://actions.google.com/sounds/v1/science_fiction/alien_breath.ogg'
  },
  {
    id: 'trk_02',
    title: 'AI_GEN_SEQ_02: NEON_DRIVE.ogg',
    url: 'https://actions.google.com/sounds/v1/science_fiction/sci_fi_hover_craft.ogg'
  },
  {
    id: 'trk_03',
    title: 'AI_GEN_SEQ_03: SOLAR_STATIC.ogg',
    url: 'https://actions.google.com/sounds/v1/science_fiction/space_wind.ogg'
  }
];

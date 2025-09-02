export interface Spell {
  index: string;
  name: string;
  level: number;
  url: string;
}


export interface SpellDetail {
  index: string;
  name: string;
  desc: string[];
  higher_level?: string[];
  range: string;
  components: string[];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  area_of_effect?: {
    type: string;
    size: number;
  };
  school: {
    index: string;
    name: string;
    url: string;
  };
  classes: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  subclasses?: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  url: string;
  updated_at: string;
}

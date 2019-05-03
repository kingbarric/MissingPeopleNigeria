import {Injectable} from "@angular/core";
import {ACTIVITIES} from "./mock-activities";

@Injectable()
export class ActivityService {
  private activities: any;
  private data:{};

  constructor() {
    this.activities = ACTIVITIES;
  }

  getAll() {
    return this.activities;
  }
setPost(data){
this.data = data;
}
getData(){
  return this.data;
}

  getItem(id) {
    for (var i = 0; i < this.activities.length; i++) {
      if (this.activities[i].id === parseInt(id)) {
        return this.activities[i];
      }
    }
    return null;
  }

  remove(item) {
    this.activities.splice(this.activities.indexOf(item), 1);
  }
}

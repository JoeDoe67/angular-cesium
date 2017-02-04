import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import {Http, Response} from "@angular/http";
import {Component, OnInit, Output, EventEmitter} from "@angular/core";


class SendOption {
    static CHUNK = 'chunk';
    static ONE_BY_ONE = 'oneByOne';
}

@Component({
    selector: 'performance-form',
    templateUrl: './performance-form.component.html',
    styleUrls: ['./performance-form.component.css']
})
export class PerformanceFormComponent implements OnInit {
    @Output() cleanMap = new EventEmitter();

    private numOfEntities = 500;
    private interval = 500;
    private sendOption = SendOption.CHUNK;

    constructor(private http: Http) {
    }


    ngOnInit() {
    }

    change() {
        this.http.post('http://localhost:3000/change',
            {
                interval: this.interval,
                numOfEntities: this.numOfEntities,
                sendOption: this.sendOption
            }).catch(this.handleError)
            .subscribe(() => {
                this.cleanMap.emit();
                alert('changed');
            });
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        alert(`error: ${errMsg}`);
        return Observable.throw(errMsg);
    }
}
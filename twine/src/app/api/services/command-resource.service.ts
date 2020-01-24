/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ComplaintDTO } from '../models/complaint-dto';

/**
 * Command Resource
 */
@Injectable({
  providedIn: 'root',
})
class CommandResourceService extends __BaseService {
  static readonly createComplaintUsingPOSTPath = '/api/command/complaints';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param complaintDTO complaintDTO
   * @return OK
   */
  createComplaintUsingPOSTResponse(complaintDTO: ComplaintDTO): __Observable<__StrictHttpResponse<ComplaintDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = complaintDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/command/complaints`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ComplaintDTO>;
      })
    );
  }
  /**
   * @param complaintDTO complaintDTO
   * @return OK
   */
  createComplaintUsingPOST(complaintDTO: ComplaintDTO): __Observable<ComplaintDTO> {
    return this.createComplaintUsingPOSTResponse(complaintDTO).pipe(
      __map(_r => _r.body as ComplaintDTO)
    );
  }
}

module CommandResourceService {
}

export { CommandResourceService }

import { Injectable } from '@nestjs/common';

interface Pagination {
  limit: number;
  page: number;
  where: any;
  order: any;
}

@Injectable()
export class BaseService {
  private readonly Model;

  constructor(readonly model) {
    this.Model = model;
  }

  /**
   *
   * @param pagination
   * @constructor
   */
  public async Pagination(pagination: Pagination) {
    const order: Array<any> = [];
    const offset = pagination.page * pagination.limit;
    if (Array.isArray(pagination.order)) {
      pagination.order.map((item) => {
        if (Object.keys(item) && Object.values(item)) {
          order.push([Object.keys(item).pop(), Object.values(item).pop()]);
        }
      });
    }
    const response = await this.Model.findAndCountAll({
      limit: pagination.limit,
      offset,
      order,
      where: pagination.where,
    });
    return {
      totalItems: response.count,
      items: response.rows,
      totalPages: Math.ceil(response.count / pagination.limit),
      currentPage: pagination.page,
    };
  }
}

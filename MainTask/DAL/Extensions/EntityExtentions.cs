using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace MainTask.DAL.Extensions
{
    public static class EntityExtentions
    {
        public static IQueryable<TEntity> SortBy<TEntity>(this IQueryable<TEntity> query, string sortOrder, string sortField) where TEntity : class
        {
            return query.OrderBy($"{sortField} {sortOrder}");
        }

        public static IQueryable<TEntity> SortByDescending<TEntity>(this IQueryable<TEntity> query, string sortOrder, string sortField) where TEntity : class
        {
            return query.OrderBy($"{sortField} {sortOrder}");
        }

        public static IEnumerable<TSource> DistinctBy<TSource, TKey>
    (this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }
    }
}

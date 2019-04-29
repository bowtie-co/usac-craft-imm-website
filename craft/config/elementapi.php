<?php
namespace Craft;

return [
    'endpoints' => [
        'craft-api/search.json' => function() { return [
            'elementType' => 'Category',
            'paginate' => false,
            'jsonOptions' => JSON_PRETTY_PRINT,
            'criteria' => [
                'group' => 'resourceAlphabet',
            ],
            'transformer' => function(CategoryModel $letter) {
                $resourceEntries = craft()->elements->getCriteria(ElementType::Entry)->section('resources')->search(craft()->request->getParam('q') ? 'title:'.'*'.craft()->request->getParam('q').'*' : '')->relatedTo($letter->id)->find();
                $resourceCount = craft()->elements->getCriteria(ElementType::Entry)->section('resources')->search(craft()->request->getParam('q') ? 'title:'.'*'.craft()->request->getParam('q').'*' : '')->relatedTo($letter->id)->total();

                $resources = [];

                foreach ($resourceEntries as $resourceEntry) {

                    $categories = [];
                    $types = [];

                    foreach ($resourceEntry->resourceCategory as $category) {
                        $categories[] = [
                            'id' => $category->id,
                            'title' => $category->title,
                            'slug' => $category->slug,
                        ];
                    }

                    foreach ($resourceEntry->resourceType as $type) {
                        $types[] = [
                            'id' => $type->id,
                            'title' => $type->title,
                            'slug' => $type->slug,
                        ];
                    }

                    if(isset($resourceEntry->resourceAssets[0])) {
                        $asset = $resourceEntry->resourceAssets[0]->getUrl();
                    } else if(isset($resourceEntry->resourceUrl) && $resourceEntry->resourceUrl !== null && $resourceEntry->resourceUrl !== ''){
                        $asset = $resourceEntry->resourceUrl;
                    } else {
                        continue;
                    }


                    $resource = [
                        'id' => $resourceEntry->id,
                        'title' => $resourceEntry->title,
                        'url' =>	$resourceEntry->url,
                        'categories' => $categories,
                        'types' => $types,
                        'asset' => $asset,
                    ];

                    array_push($resources, $resource);
                }



                return [
                    'id' => $letter->id,
                    'title' => $letter->title,
                    'count' => $resourceCount,
                    'resources' => $resources,
                ];
            }
        ]; },

        'craft-api/by-letter.json' => function() { return [
            'elementType' => 'Category',
            'paginate' => false,
            'jsonOptions' => JSON_PRETTY_PRINT,
            'criteria' => [
                'group' => 'resourceAlphabet',
            ],
            'transformer' => function(CategoryModel $letter) {
                $resourceEntries = craft()->elements->getCriteria(ElementType::Entry)->section('resources')->relatedTo($letter->id)->find();
                $resourceCount = craft()->elements->getCriteria(ElementType::Entry)->section('resources')->relatedTo($letter->id)->total();

                $resources = [];

                foreach ($resourceEntries as $resourceEntry) {

                    $categories = [];
                    $types = [];

                    foreach ($resourceEntry->resourceCategory as $category) {
                        $categories[] = [
                            'id' => $category->id,
                            'title' => $category->title,
                            'slug' => $category->slug,
                        ];
                    }

                    foreach ($resourceEntry->resourceType as $type) {
                        $types[] = [
                            'id' => $type->id,
                            'title' => $type->title,
                            'slug' => $type->slug,
                        ];
                    }

                    if(isset($resourceEntry->resourceAssets[0])) {
                        $asset = $resourceEntry->resourceAssets[0]->getUrl();
                    } else if(isset($resourceEntry->resourceUrl) && $resourceEntry->resourceUrl !== null && $resourceEntry->resourceUrl !== ''){
                        $asset = $resourceEntry->resourceUrl;
                    } else {
                        if($resourceCount > 0) $resourceCount--;
                        continue;
                    }

                    $resource = [
                        'id' => $resourceEntry->id,
                        'title' => $resourceEntry->title,
                        'url' =>	$resourceEntry->url,
                        'categories' => $categories,
                        'types' => $types,
                        'asset' => $asset,
                    ];

                    array_push($resources, $resource);
                }



                return [
                    'id' => $letter->id,
                    'title' => $letter->title,
                    'count' => $resourceCount,
                    'resources' => $resources,
                ];
            },
        ]; },

        'craft-api/types.json' => function() { return [
            'elementType' => 'Category',
            'jsonOptions' => JSON_PRETTY_PRINT,
            'criteria' => [
                'group' => 'resourceTypes',
            ],
            'transformer' => function(CategoryModel $category) {
                $entryIds = craft()->elements->getCriteria(ElementType::Entry)->section('resources')->ids();
                $total = craft()->elements->getCriteria(ElementType::Category)->id($category->id)->relatedTo(['sourceElement' => $entryIds])->group('resourceTypes')->total();

                return [
                    'id' => $category->id,
                    'title' => $category->title,
                    'slug' => $category->slug,
                    'total' => $total,
                ];
            },
        ]; },

        'craft-api/categories.json' => function() { return [
            'elementType' => 'Category',
            'jsonOptions' => JSON_PRETTY_PRINT,
            'criteria' => [
                'group' => 'resourceCategories',
            ],
            'transformer' => function(CategoryModel $category) {
                $entryIds = craft()->elements->getCriteria(ElementType::Entry)->section('resources')->ids();
                $total = craft()->elements->getCriteria(ElementType::Category)->id($category->id)->relatedTo(['sourceElement' => $entryIds])->group('resourceCategories')->total();

                return [
                    'id' => $category->id,
                    'title' => $category->title,
                    'slug' => $category->slug,
                    'total' => $total,
                ];
            },
        ]; },

        'craft-api/renew-links.json' => function() { return [
            'elementType' => 'GlobalSet',
            'jsonOptions' => JSON_PRETTY_PRINT,
            'criteria' => [
                'handle' => 'renewLinks',
            ],
            'transformer' => function(GlobalSetModel $globalSet) {

                return [
                    'race' => $globalSet->race,
                    'ride' => $globalSet->ride,
                    'official' => $globalSet->official,
                    'coach' => $globalSet->coach,
                    'mechanic' => $globalSet->mechanic,
                    'director' => $globalSet->director,
                    'driver' => $globalSet->driver,
                ];
            },
        ]; },


        'craft-api/event-ids.json' => function() { return [
            'elementType' => 'Entry',
            'jsonOptions' => JSON_PRETTY_PRINT,
            'criteria' => [
                'section' => 'eventsSection',
                'title' => 'events',
            ],
            'transformer' => function(EntryModel $entry) {
                $eventIdsArray = [];
                foreach ($entry->eventCarouselMatrix as $block) {
                  switch ($block->type->handle) {
                    case 'event':
                    $eventIdsArray[] = [
                   'eventId' => $block->eventId,
                ];
                break;
                }
              }
                return [
                    'eventIds' => $eventIdsArray,
                ];
            },
        ]; },

    ]
];

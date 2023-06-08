<template>
    <div class="my-auto">
        <slot />
        <div class="mx-auto mt-1 flex h-full w-11/12 flex-wrap border border-solid border-primary">
            <div class="relative h-5/6 w-full">
                <!-- <div class="w-full text-center">大俠發功成果</div> -->
                <slot name="graph"></slot>
            </div>
            <span class="mx-auto text-xs">總時長：<slot name="duration"></slot></span>
            <div class="my-2 w-full flex"><slot name="level" /></div>
        </div>
        <table class="mx-auto mt-2 w-11/12 border border-solid border-primary">
            <tr>
                <td class="w-6 border border-solid border-primary p-1 text-center text-lg leading-tight">
                    <slot name="levelString" />
                </td>
                <td class="w-20 border border-solid border-primary text-center">
                    <slot name="image" />
                </td>
                <td class="border border-solid border-primary p-0">
                    <table class="w-full">
                        <tr class="h-12 border-b border-solid border-primary text-sm">
                            <td class="text-center"><slot name="poem" /></td>
                        </tr>
                        <tr class="">
                            <td class="p-1">
                                <div class="mb-2 flex pl-6 text-sm">
                                    <div class="mx-2 w-6 rounded-full border border-solid border-primary text-center">
                                        宜
                                    </div>
                                    <slot name="do" />
                                </div>
                                <div class="flex pl-6 text-sm">
                                    <div class="mx-2 w-6 rounded-full border border-solid border-primary text-center">
                                        忌
                                    </div>
                                    <slot name="dont" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="border-b border-solid border-primary">
                <td colspan="2">
                    <div class="my-3 text-right text-primary">大俠心境：</div>
                </td>
                <td colspan="1">
                    <div class="flex">
                        <slot name="mood" />
                    </div>
                </td>
            </tr>
            <tr class="border-x border-solid border-primary">
                <td colspan="2">
                    <div class="mt-3 text-right text-primary">俠客風範：</div>
                </td>
                <td></td>
            </tr>
            <tr class="border-b border-solid border-primary">
                <td></td>
                <td colspan="2">
                    <div class="mb-3 mr-8 flex text-sm">
                        <slot name="style" />
                    </div>
                </td>
            </tr>
            <tr class="border-x border-solid border-primary">
                <td colspan="2">
                    <div class="mt-3 text-right text-primary">今日運勢：</div>
                </td>
                <td></td>
            </tr>
            <tr class="border-b border-solid border-primary">
                <td></td>
                <td colspan="2">
                    <div class="mb-4 flex text-sm">
                        <slot name="luck" />
                    </div>
                </td>
            </tr>
        </table>
        <div class="text-center text-sm my-2">*截圖分享你是哪類武功奇才*</div>
    </div>
</template>
